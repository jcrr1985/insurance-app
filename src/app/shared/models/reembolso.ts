

export class Reembolso {
  private readonly _idPrestacion: number;
  private readonly _idPrestacionVT!: number;
  private readonly _codigoIsapre: number;
  private readonly _folio: string;
  private readonly _fechaAtencion: Date;
  private readonly _idTipoDoc!: number;
  private readonly _rutPrestador: string;
  private readonly _archivosAdjuntos: any[];
  private readonly _prestacionesAnadidas: any[];
  private readonly _reembolsoResumen: any;
  private readonly _montoTotalSolicitado: number;
  private readonly _montoTotalBonificacion: number;
  private readonly _montoTotalPrestacion: number;

  // Flujo medicamentos
  private _esRecetaPermanente!: boolean;
  private _flagDescuentoAcumulado: boolean = false;
  private _descuentoAcumulado: number = 0;

  // Flujo consulta médica y exámenes y proc.
  private _esCopagoMayor15UF: boolean = false;
  private _esPasoPorIsapre: boolean = false; /* Solo para caso boleta/factura */

  // Flujo dentales
  private _esMasDeUnaAtencion: boolean;

  // Sesiones por arancel
  private _flagMasDeUnaSesion: boolean = false;

  constructor(
    idPrestacion: number,
    codigoIsapre: number,
    folio: string,
    fechaAtencion: Date,
    idTipoDoc: string,
    rutPrestador: string,
    archivosAdjuntos: any[],
    prestacionesAnadidas: any[],
    reembolsoResumen: any,
    montoTotalSolicitado: any,
    montoTotalBonificacion: number,
    montoTotalPrestacion: number,
    esMasDeUnaAtencion: boolean,
  ) {
    this._idPrestacion = idPrestacion;
    switch (idPrestacion) {
      case 1:
        this._idPrestacionVT = 2;
        break;
      case 2:
        this._idPrestacionVT = 5;
        break;
      case 3:
        this._idPrestacionVT = 3;
        break;
      case 4:
        this._idPrestacionVT = 4;
        break;
      case 5:
        this._idPrestacionVT = 3;
        break;
      case 6:
        this._idPrestacionVT = 1;
        break;
    }
    this._codigoIsapre = codigoIsapre;
    this._folio = folio;
    this._fechaAtencion = fechaAtencion;
    switch (idTipoDoc) {
      case 'Documento reembolso (isapre/fonasa)':
        this._idTipoDoc = 4;
        break;
      case 'Boleta/factura':
        this._idTipoDoc =
          this._idPrestacionVT == 1 || this._idPrestacionVT == 5 ? 7 : 11;
        break;
      case 'Bono':
        this._idTipoDoc = 8;
        break;
    }
    if (this._idPrestacion === 3) {
      this._idTipoDoc = 11;
    }
    this._rutPrestador = rutPrestador;
    this._archivosAdjuntos = archivosAdjuntos;
    this._prestacionesAnadidas = prestacionesAnadidas;
    this._reembolsoResumen = reembolsoResumen;
    this._montoTotalSolicitado = montoTotalSolicitado;
    this._montoTotalBonificacion = montoTotalBonificacion;
    this._montoTotalPrestacion = montoTotalPrestacion;
    this._esMasDeUnaAtencion = esMasDeUnaAtencion; // <- Dentales

    // Caso flag descuento acumulado para medicamentos.
    if (this._idPrestacion === 6) {
      if (montoTotalBonificacion > 0) {
        this.flagDescuentoAcumulado = true;
        this.descuentoAcumulado = montoTotalBonificacion;
      }
    }

    // Check para flag de más de una sesión.
    this._prestacionesAnadidas.forEach((arancel) => {
      if (+arancel.numeroSesiones > 1) {
        this.flagMasDeUnaSesion = true;
      }
    })

    if (this._idPrestacion === 2) {
      this.flagMasDeUnaSesion = esMasDeUnaAtencion;
    }
  }

  public get fechaAtencion(): Date {
    return this._fechaAtencion;
  }

  public get esRecetaPermanente(): boolean {
    return this._esRecetaPermanente;
  }

  public get getTipoDoc(): number {
    return this._idTipoDoc;
  }

  public get getRutPrestador(): string {
    return this._rutPrestador;
  }

  public get getFolio(): string {
    return this._folio;
  }

  public get getIdPrestacion(): number {
    return this._idPrestacion;
  }

  public set esRecetaPermanente(esRecetaPermanente: boolean) {
    this._esRecetaPermanente = esRecetaPermanente;
  }

  public get getMontoTotalSolicitado(): number {
    return this._montoTotalSolicitado;
  }

  public get esCopagoMayor15UF(): boolean {
    return this._esCopagoMayor15UF;
  }

  public set esCopagoMayor15UF(esCopagoMayor15UF: boolean) {
    this._esCopagoMayor15UF = esCopagoMayor15UF;
  }

  public get esPasoPorIsapre(): boolean {
    return this._esPasoPorIsapre;
  }

  public set esPasoPorIsapre(esPasoPorIsapre: boolean) {
    this._esPasoPorIsapre = esPasoPorIsapre;
  }

  public get esMasDeUnaAtencion(): boolean {
    return this._esMasDeUnaAtencion;
  }

  public set esMasDeUnaAtencion(esMasDeUnaAtencion: boolean) {
    this._esMasDeUnaAtencion = esMasDeUnaAtencion;
  }

  public get reembolsoResumen(): any {
    return this._reembolsoResumen;
  }

  public get getReembolsoResumen(): any[] {
    return this._prestacionesAnadidas;
  }

  public get montoTotalSolicitado(): number {
    return this._montoTotalSolicitado;
  }

  public get montoTotalBonificacion(): number {
    return this._montoTotalBonificacion;
  }

  public get montoTotalPrestacion(): number {
    return this._montoTotalPrestacion;
  }

  public get rutPrestador(): string {
    return this._rutPrestador;
  }

  public get archivosAdjuntos(): any[] {
    return this._archivosAdjuntos;
  }

  public get idPrestacion(): number {
    return this._idPrestacion;
  }

  public get idPrestacionVT(): number {
    return this._idPrestacionVT;
  }

  public get flagDescuentoAcumulado(): boolean {
    return this._flagDescuentoAcumulado;
  }

  public set flagDescuentoAcumulado(flag: boolean) {
    this._flagDescuentoAcumulado = flag;
  }

  public get descuentoAcumulado(): number {
    return this._descuentoAcumulado;
  }

  public set descuentoAcumulado(descuento: number) {
    this._descuentoAcumulado = descuento;
  }

  public get flagMasDeUnaSesion(): boolean {
    return this._flagMasDeUnaSesion;
  }

  public set flagMasDeUnaSesion(flag: boolean) {
    this._flagMasDeUnaSesion = flag;
  }

  public get codigoIsapre(): number {
    return this._codigoIsapre;
  }
}
