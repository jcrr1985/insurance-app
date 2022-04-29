// import { Injectable } from '@angular/core';
// import { BehaviorSubject, Observable } from 'rxjs';
// // import { CupertinoPane } from 'cupertino-pane';
// // import { ShareDataService } from 'src/app/shared/services/share-data.service';
// // import { Foto } from './../interfaces/foto';
// // import { Documento } from '../interfaces/documento';
// // import { HeaderSeccionDocumentos } from '../interfaces/header-modal';
// // import { Prestacion } from '../interfaces/prestaciones';
// // import { Reembolso } from '../models/reembolso';
// // import { ReembolsoEnCurso } from '../interfaces/reembolso';

// @Injectable({
//   providedIn: 'root',
// })
// export class ReembolsoEncursoService {

//   private _idPrestacion!: number;
//   private _documentoActivo!: string;

//   private _esArchivos: boolean = false;
//   private _esMostrarCopago: boolean = false;
//   private _esMostrarAgregarAdicional: boolean = false;
//   private _esPuedeContinuar: boolean = false;
//   private _estadoCamara: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   public estadoCamara$: Observable<boolean> = this._estadoCamara.asObservable();
//   private _esCopagoActivo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   public esCopagoActivo$: Observable<boolean> = this._esCopagoActivo.asObservable();
//   private _archivosAdjuntos: Foto[] = [];
//   private _esReembolsoEnCurso: boolean = false;
//   private _pasadas: number = 0;
//   private _esCopago: boolean = false;
//   private _esRecetaPermanente: boolean;
//   private _arancelesPrestacion: Prestacion[] = [];
//   private _montoTotalSolicitado: number = 0;
//   private _montoTotalBonificacion: number = 0;
//   private _montoTotalPrestacion: number = 0;
//   private _esSesiones: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//   public esSesiones$: Observable<boolean> = this._esSesiones.asObservable();
//   private _esReembolsoPreviamente: boolean;
//   private _esMasDeUnaAtencion: boolean;
//   private _rutPrestador: string = '';
//   private _folio: string;
//   private _fechaAtencion: Date;
//   private _reembolsos: Reembolso[] = [];
  
//   constructor(private shareDataService: ShareDataService) {}

//   public set modalPrestacion(modal: CupertinoPane) {
//     this._modalPrestacion = modal;
//   }

//   public get modalPrestacion() {
//     return this._modalPrestacion;
//   }

//   public get modalDetalle(): CupertinoPane {
//     return this._modalDetalle;
//   }

//   public set modalDetalle(modal: CupertinoPane) {
//     this._modalDetalle = modal;
//   }

//   public get getReembolsos(): Reembolso[]{
//     return this._reembolsos;
//   }

//   public set idPrestacion(prestacion: number) {
//     this._idPrestacion = prestacion;
//     if (!this.esReembolsoEnCurso) {
//       this.setearDocumentos();
//       this.setearHeader();
//     }
//   }

//   public get idPrestacion() {
//     return this._idPrestacion;
//   }

//   public set documentoActivo(documento: string) {
//     this._documentoActivo = documento;

//     if (this._documentoActivo === 'Receta médica' || this._idPrestacion === 6) {
//       this._modalPrestacion.calcFitHeight();
//     }
//   }

//   public get documentoActivo() {
//     return this._documentoActivo;
//   }

//   public get header() {
//     return this._header;
//   }

//   public set header(header: HeaderSeccionDocumentos) {
//     this._header = header;
//   }

//   public setearHeader() {
//     switch (this.idPrestacion) {
//       case 1:
//       case 2:
//       case 5:
//         this._header = this.shareDataService.headerTipoA;
//         break;
//       case 3:
//         this._header = this.shareDataService.headerTipoC;
//         break;
//       case 6:
//       case 4:
//         this._header = this.shareDataService.headerTipoB;
//         break;
//       default:
//         break;
//     }
//   }

//   public get documentos(): Documento[] {
//     return this._documentos;
//   }

//   public set documentos(documentos: Documento[]) {
//     this._documentos = documentos;
//   }

//   public setearDocumentos() {
//     switch (this.idPrestacion) {
//       case 1: /* Caso Consulta Médica */
//       case 2: /* Caso Atención Dental */
//       case 5: /* Caso Exámenes y Procedimientos */
//         this._documentos = [
//           this.shareDataService.documentoReembolso,
//           this.shareDataService.documentoBoletaFactura,
//           this.shareDataService.documentoBono
//         ]
//         break;
//       case 3: /* Caso Atención Hospitalaria */
//         this._documentos = [];
//         break;
//       case 4: /* Caso Marcos y Lentes */
//         this._documentos = [
//           this.shareDataService.documentoReembolso,
//           this.shareDataService.documentoBoletaFactura,
//           this.shareDataService.documentoBono,
//           this.shareDataService.documentoRecetaOptica
//         ]
//         break;
//       case 6: /* Caso Compra de Medicamentos */
//         this._documentos = [
//           this.shareDataService.documentoBoletaFactura,
//           this.shareDataService.documentoRecetaMedica,
//         ];
//         break;
//     }
//   }

//   public get esArchivos(): boolean {
//     return this._esArchivos;
//   }

//   public set esArchivos(esArchivos: boolean) {
//     this._esArchivos = esArchivos;
//   }

//   public get esMostrarCopago(): boolean {
//     return this._esMostrarCopago;
//   }

//   public set esMostrarCopago(esMostrarCopago: boolean) {
//     this._esMostrarCopago = esMostrarCopago;
//   }

//   public get esMostrarAgregarAdicional(): boolean {
//     return this._esMostrarAgregarAdicional;
//   }

//   public set esMostrarAgregarAdicional(esMostrarAgregarAdicional: boolean) {
//     this._esMostrarAgregarAdicional = esMostrarAgregarAdicional;
//   }
  
//   public get esPuedeContinuar(): boolean {
//     return this._esPuedeContinuar;
//   }

//   public set esPuedeContinuar(esPuedeContinuar: boolean) {
//     this._esPuedeContinuar = esPuedeContinuar;
//   }

//   public actualizarBotonesCamara(estado: boolean) {
//     this._estadoCamara.next(estado);
//   }

//   public get archivosAdjuntos(): Foto[] {
//     return this._archivosAdjuntos;
//   }

//   public set archivosAdjuntos(archivos: Foto[]) {
//     this._archivosAdjuntos = archivos;
//   }

//   public anadirArchivo(archivo: Foto) {
//     this.archivosAdjuntos.push(archivo);
//     this.esArchivos = true;
//   }

//   public get esReembolsoEnCurso(): boolean {
//     return this._esReembolsoEnCurso;
//   }

//   public set esReembolsoEnCurso(reembolsoEnCurso: boolean) {
//     this._esReembolsoEnCurso = reembolsoEnCurso;
//   }

//   public get esCopago() {
//     return this._esCopago;
//   }

//   public set esCopago(esCopago: boolean) {
//     this._esCopago = esCopago;
//     this._modalPrestacion.calcFitHeight();
//     this.esMostrarAgregarAdicional = false;
//   }

//   actualizarEstadoCopago(estado: boolean) {
//     this._esCopagoActivo.next(estado);
//   }

//   public set esRecetaPermanente(esRecetaPermanente: boolean) {
//     this._esRecetaPermanente = esRecetaPermanente;
//   }

//   public get esRecetaPermanente() {
//     return this._esRecetaPermanente;
//   }

//   public set arancelesPrestacion(prestaciones: Prestacion[]) {
//     this._arancelesPrestacion = prestaciones;
//   }

//   public get arancelesPrestacion() {
//     return this._arancelesPrestacion;
//   }

//   public anadirPrestacion(prestacion: Prestacion) {
//     this.arancelesPrestacion.push(prestacion);
//   }

//   public get montoTotalSolicitado(): number {
//     return this._montoTotalSolicitado;
//   }
  
//   public set montoTotalSolicitado(value: number) {
//     this._montoTotalSolicitado = value;
//   }

//   public get montoTotalBonificacion(): number {
//     return this._montoTotalBonificacion;
//   }
  
//   public set montoTotalBonificacion(value: number) {
//     this._montoTotalBonificacion = value;
//   }

//   public get montoTotalPrestacion(): number {
//     return this._montoTotalPrestacion;
//   }
//   public set montoTotalPrestacion(value: number) {
//     this._montoTotalPrestacion = value;
//   }

//   public get rutPrestador(): string {
//     return this._rutPrestador;
//   }

//   public set rutPrestador(value: string) {
//     this._rutPrestador = value;
//   }

//   public get folio(): string {
//     return this._folio;
//   }

//   public set folio(folio: string) {
//     this._folio = folio;
//   }

//   public get fechaAtencion(): Date {
//     return this._fechaAtencion;
//   }

//   public set fechaAtencion(fecha: Date) {
//     this._fechaAtencion = fecha;
//   }

//   public get esReembolsoPreviamente(): boolean {
//     return this._esReembolsoPreviamente;
//   }

//   public set esReembolsoPreviamente(esReembolsoPreviamente: boolean) {
//     this._esReembolsoPreviamente = esReembolsoPreviamente;
//   }

//   public get esMasDeUnaAtencion(): boolean {
//     return this._esMasDeUnaAtencion;
//   }

//   public set esMasDeUnaAtencion(esMasDeUnaAtencion: boolean) {
//     this._esMasDeUnaAtencion = esMasDeUnaAtencion;
//   }

//   public get reembolsos(): Reembolso[] {
//     return this._reembolsos;
//   }

//   public set reembolsos(reembolso: Reembolso[]) {
//     this._reembolsos = reembolso;
//   }

//   public get pasadas(): number {
//     return this._pasadas;
//   }

//   public actualizarEstadoSesiones(estado: boolean) {
//     this.modalDetalle.calcFitHeight();
//     this._esSesiones.next(estado);
//   }

//   public actualizarDocumentos() {
//     let documentosActuales = this.documentos
//     let archivosAdjuntos = this.archivosAdjuntos;
//     this._pasadas += 1;
//     if (this.idPrestacion === 2 && this._pasadas === 1) {
//       documentosActuales.push(this.shareDataService.documentoSolicitudDental);
//       documentosActuales.push(this.shareDataService.documentoPresupuestoDental);
//       this.header = this.shareDataService.headerTipoB;
//     }
//     // Filtro de documentos para quitar los ya subidos.
//     archivosAdjuntos.forEach((archivo) => {
//       switch (archivo.tipoDocumento) {
//         case 'Documento reembolso (isapre/fonasa)':
//         case 'Boleta/factura':
//         case 'Bono':
//           documentosActuales = documentosActuales.filter(documento => documento.obligatorio !== false);
//           break;
//         case 'Receta óptica':
//           documentosActuales = documentosActuales.filter(documento => documento.tituloDocumento !== 'Receta óptica');
//           break;
//         case 'Receta médica':
//           documentosActuales = documentosActuales.filter(documento => documento.tituloDocumento !== 'Receta médica');
//           break;
//         case 'Solicitud de formulario dental':
//           documentosActuales = documentosActuales.filter(documento => documento.tituloDocumento !== 'Solicitud de formulario dental');
//           break;
//         case 'Presupuesto dental':
//           documentosActuales = documentosActuales.filter(documento => documento.tituloDocumento !== 'Presupuesto dental');
//           break;
//       }
//     });
//     this._documentos = documentosActuales;

//     // Caso para atención dental para cuando quede solo 1 documento.
//     if (this.idPrestacion === 2 && this._pasadas === 2) {
//       this.header = {
//         titulo: 'Sube tu ' + this._documentos[0].tituloDocumento.toLowerCase(),
//         descripcion: undefined
//       }
//     }
//     // Caso para marcos y lentes.
//     else if (this.idPrestacion === 4 || this.idPrestacion === 6) {
//       if (this._documentos.length === 1) {
//         this.header = {
//           titulo: 'Sube tu ' + this._documentos[0].tituloDocumento.toLowerCase(),
//           descripcion: undefined
//         }
//       } else {
//         this.header = this.shareDataService.headerTipoA;
//       }
//     }
//     // Caso para cuando se acaben los documentos a subir.
//     if (this._documentos.length === 0) {
//       this.esMostrarAgregarAdicional = true;
//       this.documentoActivo = '';
//       this.esPuedeContinuar = true;
//       if (this.idPrestacion === 1 || this.idPrestacion === 5) {
//         let docDiagnostico = archivosAdjuntos.filter(archivo => archivo.tipoDocumento === 'Documento diagnóstico');
//         if (docDiagnostico.length === 1) {
//           this.esMostrarCopago = false;
//           this.actualizarEstadoCopago(false);
//         } else {
//           this.esMostrarCopago = true;
//         }
//       }
//     }
//     if (this._documentos.length > 0) {
//       this.actualizarBotonesCamara(false);
//     }
//   }

//   public reiniciarServicio() {
//     this.idPrestacion = 0;
//     this.documentoActivo = 'undefined';
//     this.esArchivos = false;
//     this.documentos = [];
//     this.esMostrarCopago = false;
//     this.esMostrarAgregarAdicional = false;
//     this.esPuedeContinuar = false;
//     this.actualizarBotonesCamara(false);
//     this.actualizarEstadoCopago(false);
//     this.archivosAdjuntos = [];
//     this.esReembolsoEnCurso = false;
//     this._pasadas = 0;
//     this._esCopago = false;
//     this.esRecetaPermanente = false;
//     this.arancelesPrestacion = [];
//     this.montoTotalSolicitado = 0;
//     this.montoTotalBonificacion = 0;
//     this.montoTotalPrestacion = 0;
//     this.rutPrestador = '';
//     this.esReembolsoPreviamente = false;
//     this.esMasDeUnaAtencion = false;
//     this.folio = '';
//     this.fechaAtencion = new Date();
//   }

//   public guardarReembolso() {
//     let tipoDocumento = '';
//     this.archivosAdjuntos.forEach((documento) => {
//       if (documento.tipoDocumento === 'Documento reembolso (isapre / fonasa)') {
//         tipoDocumento += 'Documento reembolso (isapre / fonasa)';
//       } else if (documento.tipoDocumento === 'Boleta / factura') {
//         tipoDocumento += 'Boleta / factura';
//       } else if (documento.tipoDocumento === 'Boleta / factura') {
//         tipoDocumento += 'Bono';
//       }
//     });

//     let reembolsoActual = new Reembolso(
//       this.idPrestacion,
//       this.folio,
//       this.fechaAtencion,
//       tipoDocumento,
//       this.rutPrestador,
//       this.archivosAdjuntos,
//       this.arancelesPrestacion,
//       this.generarResumen(this.arancelesPrestacion),
//       this.montoTotalSolicitado,
//       this.montoTotalBonificacion,
//       this.montoTotalPrestacion
//     );

//     if (this.idPrestacion === 6) {
//       reembolsoActual.esRecetaPermanente = this.esRecetaPermanente;
//     }

//     if (this.idPrestacion === 1 || this.idPrestacion === 5) {
//       const docCopago = this.archivosAdjuntos.filter(archivo => archivo.tipoDocumento === 'Documento diagnóstico');
//       if (docCopago.length === 1) {
//         reembolsoActual.esCopagoMayor15UF = true;
//       }
//     }

//     if ((this.idPrestacion === 1 || this.idPrestacion === 5) && tipoDocumento === 'Boleta / factura') {
//       reembolsoActual.esPasoPorIsapre = this.esReembolsoPreviamente;
//     }

//     if (this.idPrestacion === 2) {
//       reembolsoActual.esMasDeUnaAtencion = this.esMasDeUnaAtencion;
//     }

//     this._reembolsos.push(reembolsoActual);
//   }

//   public generarResumen(reembolsos: Prestacion[]) {
//     let descripcionReembolso: string;
//     switch (this.idPrestacion) {
//       case 1:
//         descripcionReembolso = 'Total consulta médica';
//         break;
//       case 2:
//         descripcionReembolso = 'Total atención dental';
//         break;
//       case 3:
//         descripcionReembolso = 'Atención hospitalaria';
//         break;
//       case 4:
//         descripcionReembolso = 'Marcos y lentes';
//         break;
//       case 5:
//         descripcionReembolso = 'Total exámenes';
//         break;
//       case 6:
//         descripcionReembolso = 'Compra de medicamentos';
//         break;
//     }

//     let montoSolicitado = 0;
//     let reembolso: ReembolsoEnCurso;
//     if (this.idPrestacion !== 3) {
//       reembolsos.forEach(reembolso => {
//         montoSolicitado += Number(reembolso.valorTotal);
//       });
//       reembolso = {
//         descripcion: descripcionReembolso,
//         montoSolicitado: montoSolicitado,
//       }
//     } else {
//       reembolso = {
//         descripcion: descripcionReembolso,
//         montoSolicitado: this.montoTotalSolicitado,
//       }
//     }
//     return reembolso;
//   }
// }
