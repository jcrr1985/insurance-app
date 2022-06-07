import { Router } from '@angular/router';
import { DataStorageService } from './../../shared/services/data-storage.service';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
import { Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/interfaces/ICard';
import * as moment from 'moment';
import { IResponseConsignment } from 'src/app/shared/interfaces/IResponseConsignment';
import { IConsignment } from 'src/app/shared/interfaces/IConsignment';
import { IBeneficiario } from 'src/app/shared/interfaces/beneficiarios';
import { Usuario } from 'src/app/shared/interfaces/usuario';
import { DataUsuarioService } from 'src/app/shared/services/data-usuario/data-usuario.service';
import { IGasto } from 'src/app/shared/interfaces/IGasto';
import { IArancel } from 'src/app/shared/interfaces/IArancel';
import { IDocument } from 'src/app/shared/interfaces/IDocument';
import { ThrowStmt } from '@angular/compiler';
import Utils from 'src/app/shared/utils/utils';

@Component({
  selector: 'app-tabla-resumen-reembolso',
  templateUrl: './tabla-resumen-reembolso.component.html',
  styleUrls: ['./tabla-resumen-reembolso.component.scss']
})
export class TablaResumenReembolsoComponent implements OnInit {
  public montoTotalSolicitado: any = 0;
  public nuevoReembolso: boolean = false;
  public prestacionesCargadas: any = [];
  public consignment!: IConsignment;
  public montoSolicitado: string = '';
  public numeroSolicitado: string = '';
  public usuario!: Usuario;
  public usuarioSeleccionado!: any;
  public formatter = new Intl.NumberFormat('es-CL');
  public fechaHoy: string = moment().format('DD/MM/YYYY');
  public solicitudes: any[] = [];

  public opcionesPrestacionesCLEM: ICard[] = [
    { prestacion: 'Consulta Médica', name: 'atencionmedica', status: '', idPrestacion: 1 },
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
  public idPrestacionVT!: number;
  public tipoDocVT!: number;
  public goToMensajeFinal: boolean = false;
  public mostrarModalFinal: boolean = false;
  public tarjetaSeleccionada!: ICard;
  public radioBtnNuevoReembolso: string = '';
  public fechaAtencion: any;
  public valorDeHospitalario!: boolean;
  public monTotal: any;
  public bonificacionTotal: any = 0;
  public nombre: any;
  public apellido: any;
  public rut: any;
  getTipoDoc: any;


  constructor(private dataStorageService: DataStorageService,
    private reembolsoService: ReembolsoService,
    private arancelService: ArancelService,
    private insuredData: DataUsuarioService,
    private router: Router
  ) { }

  ngOnInit(): void {
    document.addEventListener('onSelectDate', (evt: any) => {
      const r = this.dataStorageService.getBeneficiarioRut
    })
    this.usuario = this.insuredData.usuarioConectado;
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => {
      this.prestacionSeleccionada = id;
    });
    this.dataStorageService.getPrestacionesResumen().subscribe(prestaciones => {
      this.prestacionesCargadas = prestaciones;
      this.calcularTablaResumen();
      this.dataStorageService.getFormReemboslo().subscribe(data => {
        this.montoSolicitado = data.stepThree_general.montoSolicitado
        try {
          const usuarioSeleccionadoFullName = this.dataStorageService.getBeneficiario;
          let split = usuarioSeleccionadoFullName.key.split(" ");
          this.nombre = split[0];
          this.apellido = split[3];
          this.usuarioSeleccionado = `${this.nombre} ${this.apellido}`
          const rut = usuarioSeleccionadoFullName.value;
          this.rut = usuarioSeleccionadoFullName.value;
          this.fechaAtencion = this.dataStorageService.getFechaAtencion;
        } catch (error) { }
      });
    });

    if (this.prestacionSeleccionada == 2) {
      this.nuevoReembolso = false;

    }
    this.dataStorageService.tipoDocument$.subscribe(e => {
      // console.log('tipoDocument', e)

    })
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
          fecha: this.construirFechaActual()
        };
        this.solicitudes.push(dataSolicitud);
      }
    }
    let monto = 0;
    let monTotal = 0
    for (let solicitudes of this.solicitudes) {
      monTotal += Number(solicitudes.valorPrestacion)
      monto += Number(solicitudes.valorPrestacion) - Number(solicitudes.bonificacion);
      // console.log('monto', monto)
      this.bonificacionTotal += solicitudes.bonificacion
    }
    this.montoTotalSolicitado = monto;
    // console.log('this.montoTotalSolicitado', this.montoTotalSolicitado)
    this.monTotal = monTotal
    // console.log('this.prestacionSeleccionada', this.prestacionSeleccionada)


    this.valorDeHospitalario = this.dataStorageService.valorDeHospitalario
    // console.log('this.valorDeHospitalario', this.valorDeHospitalario)

  }

  setPrestacion(id: number) {
    this.dataStorageService.setIdPrestacion(id);
    this.arancelService.idprestacionSeleccionada = id;
  }
  cancelar() {
    this.restaurarFormulario(true);
    this.dataStorageService.clearOrNot.next(true);
    this.router.navigate(['/']);
  }

  habilitarSeleccionBeneficiario(valor: boolean) {
    this.reembolsoService.setHabilitarStepone(valor);
    //this.restaurarFormulario();


  }

  returnValorRadioButtons() {
    return this.nuevoReembolso;
  }
  restaurarFormulario(restaruarAll?: boolean) {
    this.dataStorageService.resturarFormularioReembolso();
    this.dataStorageService.restaurarDetallePrestaciones();
    if (restaruarAll) {
      this.dataStorageService.setIdPrestacion(0);
      this.dataStorageService.restaurarPrestacionesResumen()
    }
  }
  construirFechaActual() {
    return moment().format('DD/MM/YYYY');
  }
  goBack() {
    this.dataStorageService.popPrestacionResume();
  }
  async finalizarGo() {
    //Desactivar boton finalizar mientras envia.
    try {
      //mostrar loader
      const dataResponse: IResponseConsignment | null = await this.postConsigment();
      this.numeroSolicitado = dataResponse!.remesa;
      //Ocultar loader
      this.mostrarModalFinal = true;
      this.restaurarFormulario();
    } catch (error) {
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

  private makeConsignment(): IConsignment {
    let sistemaOperativo: string = "Windows"; // "Windows|Android|iOS|Mac|Linux|Otros" - Get OS (FALTANTE)
    //ASIGNACION CLASIFICACION Y COBERTURA SEGUN PRESTACION
    let clasificacion: number = 1;
    let cobertura: string = "95";
    switch(this.prestacionesCargadas[0].idprestacionSeleccionada) {
      case 2: //Hospitalaria
        clasificacion = 3;
        cobertura = "0063";
        break;
      case 4: //dental
        clasificacion = 2;
        cobertura = "97";
        break;
    }
    //Setear el beneficiario seleccionado
    let beneficiario = this.usuario.cargas.filter((carga: { rut: any; }) =>
        carga.rut == this.prestacionesCargadas[0].formValues.stepOne_who.personaSeleccionada.slice(0, -1))[0];
    const dataConsignment: IConsignment = {
      policy: this.usuario.poliza,
      clasif: clasificacion,
      idIsapre: this.prestacionesCargadas[0].idprestacionSeleccionada != 2 ?
                this.prestacionesCargadas[0].formValues.stepThree_general.agenciaSeleccionada : +this.usuario.codigoIsapre,
      folioDenuncio: 0,
      plataforma: 'WEB', // "DESKTOP|APP|MOVIL" - GET Dispositivo (FALTANTE)
      sistemaOperativo: sistemaOperativo,
      apellidosBeneficiario: beneficiario.apellidos,
      apellidosTitular: this.usuario.apellidos,
      codCobertura: `${cobertura}`,
      codigoBanco: `${this.usuario.codBanco}`,
      dvRutBeneficiario: beneficiario.dv,
      dvRutTitular: this.usuario.cargas[0].dv,
      fechaDenuncia: new Date(),
      mailCliente: this.usuario.mailCliente,
      nombresBeneficiario: beneficiario.nombres,
      nombresTitular: this.usuario.nombres,
      numeroCuenta: this.usuario.ctaBancaria,
      rutBeneficiario: beneficiario.rut,
      rutTitular: this.usuario.cargas[0].rut,
      nombreBanco: this.usuario.nombreBanco,
      montoTotal: this.montoTotalSolicitado,
      gastos : this.prestacionesCargadas.map(
          (prestacion : any) => {
            const docs = this.getFileByIdPrestacion(prestacion);
            let descAcum = 0;
            let montoDoc = 0;
            prestacion.prestaciones.forEach( (p: { valorPrestacion: number; bonificacion: number; }) => {
              montoDoc += p.valorPrestacion;
              descAcum += p.bonificacion;
            });
            const fechaAtencion = prestacion.formValues.stepThree_general.fechaAtencion;
            const fechaIngresada = Utils.formatearFecha(fechaAtencion);
            const gasto : IGasto = {
              base64 : docs[0].files[0].base64,
              origenImagen : docs[0].files[0].extension == 'pdf' ? 'pdf' : 'galería',
              diagnostico : '',
              docDiagnostico : [],
              folio : Number(prestacion.formValues.stepThree_general.boletaFactura),
              idPrestacion : this.idPrestacionVT,
              idTipoDoc : this.getTypeDocVT(prestacion),
              descuentoAcumulado : descAcum,
              rutPrestador : prestacion.formValues.stepThree_general.rutInstitucion.replace(/\./g,""),
              montoDocumento : montoDoc - descAcum,
              docAdicionales: this.getDocsAdicionales(docs),
              diagnosticoMonto: 0,
              flagDescuentoAcumulado: (prestacion.idprestacionSeleccionada == 6 && descAcum > 0) ? true : false, //Dato solamente para medicamentos.
              flagRecetaPermanente: (prestacion.idprestacionSeleccionada == 6 &&
                                    prestacion.formValues.stepThree_general.copagoMayor == "si") ? true : false, //Es el valor del copago cuando coloca receta permanente.
              flagDocEnvIsapre: prestacion.formValues.stepTwo_selectOption.reembolsoPrevioIsapre == "si" ? true : false,
              flagMasDeUnaSesion: ((prestacion.idprestacionSeleccionada == 4 && prestacion.formValues.stepThree_general.copagoMayor == "si") || //Condicion si declara segun flag mas de una session en dental
                                  ((prestacion.idprestacionSeleccionada != 4 && prestacion.prestaciones.find((a: { sesiones: string | number; }) => +a.sesiones > 1)))) ? true : false, //Condicion si tiene aranceles con session distinto de prestacion dental
              fecha: fechaAtencion ? fechaIngresada : new Date(),
              extension: docs[0].files[0].extension,
              aranceles : prestacion.prestaciones.map(
                (detalle : any) => {
                  const arancel : IArancel = {
                    codigo : detalle.codigoPrestacion,
                    descuento : detalle.bonificacion,
                    montoTotal : detalle.valorPrestacion,
                    nombre : detalle.prestacionSeleccionada,
                    sesiones : detalle.sesiones ? +detalle.sesiones : 0,
                    flagSesionValida : detalle.sesiones ? detalle.sesionValida : true,
                    montoComparacion : detalle.sesiones ? detalle.montoHistorico : 0
                  }
                  return arancel;
                }
              )
            }
            return gasto;
          }
      )
    };
    return dataConsignment
  }

  getDocsAdicionales(documents : any) : IDocument[] {
    let docs : IDocument[] = [];
    let x: number = 0;
    let y: number = 0;
    while(x < documents.length){
      y = x == 0 ? 1 : 0;
      while(y < documents[x].files.length){
        const document : IDocument = {
          base64 : documents[x].files[y].base64,
          extension : documents[x].files[y].extension,
          origenImagen : documents[x].files[y].extension == 'pdf' ? 'pdf' : 'galería'
        }
        docs.push(document);
        y++;
      }
      x++;
    }
    return docs;
  }

  getTypeDocVT(prestacion : any) : number {
    let typeDocVT : number = 0
    let id = prestacion.idprestacionSeleccionada;
    switch (prestacion.formValues.stepFour_general.tipoDocumentoSeleccionado){
      case 1: //Documento reembolso
        typeDocVT = 4;
        break;
      case 2:
        typeDocVT = id == 4 || id == 6 ? 7 : 11;
        break;
      case 3:
        typeDocVT = 8;
        break;
    }
    if(+id == 2){
      typeDocVT = 11 ;
    }
    return typeDocVT;
  }

  getFileByIdPrestacion(prestacion: any) : any {
    let file : any = [];
    switch(prestacion.idprestacionSeleccionada){
      case 1:
        file = prestacion.formValues.files.docsStructure.consultamedica.nameFiles;
        this.idPrestacionVT = 2;
        break;
      case 2:
        file = prestacion.formValues.files.docsStructure.hospitalario.nameFiles;
        this.idPrestacionVT = 3;
        break;
      case 3:
        file = prestacion.formValues.files.docsStructure.lentes.nameFiles;
        this.idPrestacionVT = 4;
        break;
      case 4:
        file = prestacion.formValues.files.docsStructure.dentales.nameFiles;
        this.idPrestacionVT = 5;
        break;
      case 5:
        file = prestacion.formValues.files.docsStructure.examenes.nameFiles;
        this.idPrestacionVT = 3;
        break;
      case 6:
        file = prestacion.formValues.files.docsStructure.medicamentos.nameFiles;
        this.idPrestacionVT = 1;
        break;
    }
    return file;
  }

  setRadioBtn(status: boolean) {
    this.nuevoReembolso = status;
    this.radioBtnNuevoReembolso = status ? 'si' : 'no';

  }

  setCard(tarjeta: ICard) {
    // this.dataStorageService.setIdPrestacion(tarjeta.idPrestacion);
    this.opcionesPrestacionesCLEM.forEach(e => e.status = '');
    this.opcionesPrestacionesD.forEach(e => e.status = '');
    this.opcionesPrestacionesH.forEach(e => e.status = '');
    tarjeta.status = 'active';
    this.reembolsoService.habilitarSeleccionBeneficiario.next(false)
    this.dataStorageService.idprestacionSeleccionadaBehavior.next(tarjeta.idPrestacion)
  }

  formateoValor(valor: number) {
    if (valor < 1) return '$0';
    return '$' + this.formatter.format(valor);
  }

}



