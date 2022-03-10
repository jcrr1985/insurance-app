import { Injectable } from '@angular/core';
import { Chip, DatosReembolso } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ReembolsoService {

  public datosReembolsosRepetido:DatosReembolso[] = [];

  public datosReembolsos: DatosReembolso[] = [
    {
      nombre: 'Leandro Letelier',
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion:
        {
          iconLiquidacion: {
            color: 'info2',
            size: '28',
            iconName: 'bi-arrow-down-square',
          },
          textoLiquidacion: {
            type: 's3',
            family: 'primary',
            weight: 'semiBold',
            color: 'primary',
           text:"Descargar",
          }
        }
    },
    {
      nombre: 'Jose Canessa',
      numSolicitud: 173548,
      montoSolicitado: '$13.411',
      fechaPago: '2022-07-17T09:12:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion:
        {
          iconLiquidacion: {
            color: 'info2',
            size: '28',
            iconName: 'bi-arrow-down-square',
          },
          textoLiquidacion: {
            type: 's3',
            family: 'primary',
            weight: 'semiBold',
            color: 'primary',
           text:"Descargar",
          }
        }
    },
    {
      nombre: 'Andres Bisquett',
      numSolicitud: 23012,
      montoSolicitado: '$21.947',
      fechaPago: '2019-12-28T08:58:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Jose Silva',
      numSolicitud: 35320,
      montoSolicitado: '$34.002',
      fechaPago: '2022-01-19T09:44:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Miyali Colileo',
      numSolicitud: 172621,
      montoSolicitado: '$18.021',
      fechaPago: '2016-12-28T12:18:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Sergio Asenjo',
      numSolicitud: 136436,
      montoSolicitado: '$27.200',
      fechaPago: '2016-02-14T01:18:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Sergio Inostrosa',
      numSolicitud: 366636,
      montoSolicitado: '$90.845',
      fechaPago: '2022-02-17T19:28:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Andres Retamales',
      numSolicitud: 126632,
      montoSolicitado: '$35.240',
      fechaPago: '2022-07-17T11:13:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
          text:"Descargar",
        }
      }
    },
    {
      nombre: 'Manuel Baeza',
      numSolicitud: 186237,
      montoSolicitado: '$21.301',
      fechaPago: '2019-05-08T15:04:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Javiir Rivera',
      numSolicitud: 166636,
      montoSolicitado: '$30.200',
      fechaPago: '2018-01-27T16:18:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
         text:"Descargar",
        }
      }
    },
    {
      nombre: 'Julio Rodriguez',
      numSolicitud: 166636,
      montoSolicitado: '$30.200',
      fechaPago: '2018-01-27T11:18:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion: {
        iconLiquidacion: {
          color: 'info2',
          size: '28',
          iconName: 'bi-arrow-down-square',
        },
        textoLiquidacion: {
          type: 's3',
          family: 'primary',
          weight: 'semiBold',
          color: 'primary',
          text:"Descargar",
        }
      }
    },
  ];


  public chipsData: Chip[] = [{
    nombre: "vs-Nurse-men",
    desripcion: "Consulta Médica",
    state: false
  }, {
    nombre: "vs-Hospital-bed-vive",
    desripcion: "Atención Hospitalaria",
    state: false
  }, {
    nombre: "vs-Microscope",
    desripcion: "Marcos y lentes",
    state: false
  },
  {
    nombre: "vs-Sad",
    desripcion: "Atención Dental",
    state: false
  }, {
    nombre: "bi-sunglasses",
    desripcion: "Marcos y lentes",
    state: false
  },
  {
    nombre: "vs-Recetas",
    desripcion: "Compra de medicamentos",
    state: false
  }];

  constructor() {
    let registroRepetido =  (index: number): DatosReembolso => {
     return {nombre:`Leandro Letelier ${++index}`,
      numSolicitud: 152734,
      montoSolicitado: '$13.000',
      fechaPago: '2021-12-28T11:44:00Z',
      estado: {
        darkerColor: 'p3',
        ligterColor: 'primary',
        text: 'semiBold',
        iconText: 'primary',
      },
      documentoLiquidacion:
        {
          iconLiquidacion: {
            color: 'info2',
            size: '28',
            iconName: 'bi-arrow-down-square',
          },
          textoLiquidacion: {
            type: 's3',
            family: 'primary',
            weight: 'semiBold',
            color: 'primary',
           text:"Descargar",
          }
        }}
    }
    for (let i = 0; i < 30; i++) {

      this.datosReembolsosRepetido.push(registroRepetido(i))

    }
   }

  getDatosReembolsos(): DatosReembolso[] {
    return this.datosReembolsos;
  }

  getChipsData(): Chip[] {
    return this.chipsData;
  }

  getDatosReembolsosRepetido(): DatosReembolso[] {
    return this.datosReembolsosRepetido;
  }
}
