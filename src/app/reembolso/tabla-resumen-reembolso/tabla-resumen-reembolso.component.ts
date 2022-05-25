import { DataStorageService } from './../../shared/services/data-storage.service';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/interfaces/ICard';
import * as moment from 'moment';
import { IResponseConsignment } from 'src/app/shared/interfaces/IResponseConsignment';
import { IConsignment } from 'src/app/shared/interfaces/IConsignment';
import { IBeneficiario } from 'src/app/shared/interfaces/beneficiarios';

@Component({
  selector: 'app-tabla-resumen-reembolso',
  templateUrl: './tabla-resumen-reembolso.component.html',
  styleUrls: ['./tabla-resumen-reembolso.component.scss']
})
export class TablaResumenReembolsoComponent implements OnInit {
  public montoTotalSolicitado!: number;
  public nuevoReembolso: string = '';
  public prestacionesCargadas: any = [];
  public consignment!: IConsignment;
  public montoSolicitado : string = '';
  public numeroSolicitado : string = '';

  public solicitudes: any[] = [
    {
      tipoReembolso: "Consulta medica en duro",
      numerosesiones: 3,
      valorPrestacion: 1000,
      bonificacion: 500
    },
    {
      tipoReembolso: "Compra medicamentos en duro",
      numerosesiones: 3,
      valorPrestacion: 2000,
      bonificacion: 600
    }, {
      tipoReembolso: "Examenes y Proc en Duro",
      numerosesiones: 3,
      valorPrestacion: 3000,
      bonificacion: 700
    },
  ];

  public opcionesPrestacionesCLEM: ICard[] = [
    { prestacion: 'Consulta Médica', name: 'atencionmedica', status: 'disabled', idPrestacion: 1 },
    { prestacion: 'Marcos y lentes', name: 'optica', status: '', idPrestacion: 3 },
    { prestacion: 'Examenes y Procedimientos', name: 'examenes', status: '', idPrestacion: 5 },
    { prestacion: 'Compra de medicamentos', name: 'medicamentos', status: '', idPrestacion: 6 },
  ];

  public opcionesPrestacionesD: ICard[] = [
    { prestacion: 'Atención Dental', name: 'dentista', status: '', idPrestacion: 4 },
  ];

  public opcionesPrestacionesH: ICard[] = [
    { prestacion: '', name: '', status: '', idPrestacion: 2 },
  ];


  public continuar: boolean = false;
  public prestacionSeleccionada: any;
  public goToMensajeFinal: string = 'no';
  public mostrarModalFinal: boolean = false;

  constructor(private dataStorageService: DataStorageService,
    private reembolsoService: ReembolsoService,
    private arancelService: ArancelService
    ) { }

  ngOnInit(): void {
    //this.prestacionSeleccionada = this.arancelService.getPrestacionSeleccionadaId ? this.arancelService.getPrestacionSeleccionadaId : 1;
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id);
    this.dataStorageService.getPrestacionesResumen().subscribe(prestaciones => this.prestacionesCargadas = prestaciones);
    // TODO Rectificando...
    /* this.montoAndStuff = this.dataStorageService.getmontoAndStuff;
    console.log('this.montoAndStuff', this.montoAndStuff)
    let total: number = 0;F
    this.solicitudes.forEach(solicitud => {
      total += (solicitud.valorPrestacion - solicitud.bonificacion);
    });
    this.montoTotalSolicitado = total;
    this.reembolsoService.montoTotalSolicitado = this.montoTotalSolicitado; */

    this.calcularTablaResumen();

    if (this.prestacionSeleccionada == 2) {
      this.nuevoReembolso = 'no';
      this.goToMensajeFinal = 'sí'
    }
  }

  calcularTablaResumen() {
    this.solicitudes = [];

    for (let reembolsos of this.prestacionesCargadas) {
      for (let prestacion of reembolsos.prestaciones) {
        const dataSolicitud = {
          tipoReembolso: prestacion.prestacionSeleccionada,
          numerosesiones: prestacion.numerosesiones,
          valorPrestacion: prestacion.valorPrestacion,
          bonificacion: prestacion.bonificacion,
          fecha: moment().format('DD/MM/YYYY')
        };
        this.solicitudes.push(dataSolicitud);
      }
    }
    let monto = 0;
    for (let solicitudes of this.solicitudes) {
      monto += Number(solicitudes.valorPrestacion) - Number(solicitudes.bonificacion);
    }
    this.montoTotalSolicitado = monto;
  }

  setPrestacion(id: number) {
    this.dataStorageService.setIdPrestacion(id);
    this.arancelService.idprestacionSeleccionada = id;
  }
  cancelar() {
    this.restaurarFormulario();
  }

  habilitarSeleccionBeneficiario(valor: boolean) {
    this.reembolsoService.setHabilitarStepone(valor);
    this.restaurarFormulario();
  }
  setValorRadioButtons(respuesta: string) {
    this.nuevoReembolso = respuesta;
  }
  returnValorRadioButtons() {
    return this.nuevoReembolso;
  }
  restaurarFormulario() {
    this.dataStorageService.resturarFormularioReembolso();
    this.dataStorageService.restaurarDetallePrestaciones();
  }
  construirFechaActual() {/*
    const fecha = new Date();
    const dia = fecha.getDate() < 10 ? `0${fecha.getDate()}` : fecha.getDate();
    const mes =
      fecha.getMonth() < 10 ? `0${fecha.getMonth() + 1}` : fecha.getMonth() + 1;
    const anno = fecha.getFullYear();
    return `${dia}/${mes}/${anno}`;*/
    return moment().format('DD/MM/YYYY');
  }

  async finalizarGo(){
    //Desactivar boton finalizar mientras envia.
    try{
      //mostrar loader
      const dataResponse: IResponseConsignment | null = await this.postConsigment();
      this.montoSolicitado = "40.001";
      this.numeroSolicitado = dataResponse!.remesa;
      //Ocultar loader
      this.mostrarModalFinal = true;
    }catch(error){
      //Mostrar mensaje de error
      setTimeout(() => {
        //oculatar loader
      }, 5000);
      setTimeout(() => {
        //Activar boton finalizar.
      }, 8000);
    }
  }

  async postConsigment(): Promise<IResponseConsignment | null> {
    this.consignment = this.makeConsignment();
    return await this.reembolsoService.postConsignment(this.consignment);
  }

  private makeConsignment() : IConsignment{
    let sistemaOperativo : string = "WEB"; // que se tiene que setear?
    //Asignar segun id prestacion
    let clasificacion : number = 1;
    let cobertura : number = 95;
    //setear segun monto total de todos los gastos (+ de una prestacion)
    let montoTotalTodosGastos = 0;
    //Setear el beneficiario seleccionado
    let beneficiario : IBeneficiario = {
      rut : '17793573',
      apellidos : 'HIDALGO AGUILAR',
      dv : '5',
      codParentesco : 2,
      esSeleccionado : true,
      estado : 'ACTIVO',
      nombres : 'CAMILA ALEXANDRA',
      parentesco : 'HIJO'
    }

    const dataConsignment : IConsignment = {
      policy : '281364', // setear la poliza del datapoliza
      clasif : clasificacion,
      idIsapre : 204, // setear la primera seleccionada en el detalle de prestacion, si no tiene setear la de data pehuen
      folioDenuncio : 0, //OK
      plataforma : 'WEB',
      sistemaOperativo : sistemaOperativo,
      apellidosBeneficiario : beneficiario.apellidos,
      apellidosTitular : 'HIDALGO AGUILAR', //setear desde data pehuen
      codCobertura : `${cobertura}`, // si idPrestacion es 3 (dental) enviar '0063'
      codigoBanco : '11', //setear desde data pehuen
      dvRutBeneficiario : beneficiario.dv,
      dvRutTitular : '5', //setear desde data pehuen
      fechaDenuncia: new Date(),
      mailCliente: 'chidalgoa3@gmail.com', //setearlo desde datos pehuen,
      nombresBeneficiario: beneficiario.nombres,
      nombresTitular: 'CAMILA ALEXANDRA', //setearlo desde datos pehuen,
      numeroCuenta: '121212', //setearlo desde datos pehuen
      rutBeneficiario: beneficiario.rut,
      rutTitular: '17793573',//setearlo desde datos pehuen
      nombreBanco: 'BANCO ESTADO DE CHILE',//setearlo desde datos pehuen
      montoTotal: +montoTotalTodosGastos,
      gastos : [
        {
          base64 : '/9j/4AAQSkZJRgABAQEAeAB4AAD/2wBDAAIBAQIBAQICAgICAgICAwUDAwMDAwYEBAMFBwYHBwcGBwcICQsJCAgKCAcHCg0KCgsMDAwMBwkODw0MDgsMDAz/2wBDAQICAgMDAwYDAwYMCAcIDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAz/wAARCAABAAEDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD9/KKKKAP/2Q==',
          origenImagen : 'galería',
          diagnostico : '',
          docDiagnostico : [],
          folio : 5645646, //numero ingresado en la prestacion obtener del formulario
          idPrestacion : 2, //segun valuetech
          idTipoDoc : 4, // reembolso, boleta,
          descuentoAcumulado :  0,//numero ingresado en la prestacion obtener del formulario
          rutPrestador : '18820774-k',  //numero ingresado en la prestacion obtener del formulario
          montoDocumento : 5000, //monto total de la prestacion
          docAdicionales : [], //cargar desde documentos adicionales si es que se ingresan
          diagnosticoMonto: 0,
          flagDescuentoAcumulado : false, //consultar
          flagRecetaPermanente : false, //consultar
          flagDocEnvIsapre : false, //consultar
          flagMasDeUnaSesion: false, //consultar
          fecha : new Date(), //fecha ingresada en el gasto
          extension : 'jpg', //archivo principal
          aranceles : [ //Detalles de prestacion
            {
              codigo:'101812',
              descuento:10000,
              montoTotal:15000,
              nombre:'Ginecologia y obstetricia',
              sesiones:1,
              flagSesionValida:true,
              montoComparacion:14770
            }
          ]
        }
      ]
    }
    return dataConsignment
  }


}

const examplePrestacionsCargadas = [
  {
    prestaciones: [
      {
        prestacionSeleccionada: "Consultas psiquiatria",
        tipoPrestacion: "CONSULTA",
        numerosesiones: "1 sesión",
        sesiones: 1,
        valorPrestacion: "50000",
        bonificacion: "0",
        id: 0
      }
    ],
    idprestacionSeleccionada: 1,
    formValues: {
      stepOne_who: {
        personaSeleccionada: "2"
      },
      stepTwo_selectOption: {
        prestacionSeleccionada: "Consulta Médica",
        reembolsoPrevioIsapre: "si"
      },
      stepThree_general: {
        agenciaSeleccionada: true,
        rutInstitucion: "asd",
        boletaFactura: "asd",
        fechaAtencion: "4/5/2022",
        copagoMayor: "si",
        montoSolicitado: false
      },
      stepFour_general: {
        tipoDocumentoSeleccionado: 2,
        fileUploaded: true,
        agenciaSeleccionada: false
      },
      stepFive_Details: {
        reembolsoCalculation: false
      }
    },
    id: 0
  }
]
