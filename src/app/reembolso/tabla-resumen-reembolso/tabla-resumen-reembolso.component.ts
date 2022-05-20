import { DataStorageService } from './../../shared/services/data-storage.service';
import { ArancelService } from 'src/app/shared/services/arancel-service.service';
import { ReembolsoService } from 'src/app/shared/services/reembolso.service';
import { ApplicationRef, Component, OnInit } from '@angular/core';
import { ICard } from 'src/app/shared/interfaces/ICard';
import * as moment from 'moment';

@Component({
  selector: 'app-tabla-resumen-reembolso',
  templateUrl: './tabla-resumen-reembolso.component.html',
  styleUrls: ['./tabla-resumen-reembolso.component.scss']
})
export class TablaResumenReembolsoComponent implements OnInit {
  public montoTotalSolicitado!: number;
  public nuevoReembolso: string = '';
  public prestacionesCargadas: any = [];
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


  public montoAndStuff: any;

  public continuar: boolean = false;
  public prestacionSeleccionada: any;
  public goToMensajeFinal: string = 'no';
  public mostrarModalFinal: boolean = true;

  constructor(private dataStorageService: DataStorageService, private reembolsoService: ReembolsoService, private arancelService: ArancelService) { }

  ngOnInit(): void {
    //this.prestacionSeleccionada = this.arancelService.getPrestacionSeleccionadaId ? this.arancelService.getPrestacionSeleccionadaId : 1;
    this.dataStorageService.getIdPrestacionSeleccionada().subscribe(id => this.prestacionSeleccionada = id);
    this.dataStorageService.getPrestacionesResumen().subscribe(prestaciones => this.prestacionesCargadas = prestaciones);

    // TODO Rectificando...
    /* this.montoAndStuff = this.dataStorageService.getmontoAndStuff;
    console.log('this.montoAndStuff', this.montoAndStuff)
    let total: number = 0;
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