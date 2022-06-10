import { IBeneficiario } from './beneficiarios';
import { ICobertura, IUsuario } from './usuario-api';
import { Historico } from '../models/historico';


export class Usuario {
  private readonly _codigoAsegurado: number;
  private readonly _mailCliente: string;
  private readonly _nombres: string;
  private readonly _apellidos: string;
  private readonly _ctaBancaria: string;
  private readonly _codBanco: number;
  private readonly _nombreBanco: string;
  private readonly _codigoIsapre: string;
  private readonly _estado: string;
  private readonly _poliza: string;
  private readonly _rutEmpresa: string;
  private readonly _cargas: IBeneficiario[] = [];
  private readonly _coberturas: ICobertura[] = [];
  private _historial: Historico[] = [];

  constructor(datosUsuario: IUsuario, rut: string, dv: string) {
    this._codigoAsegurado = datosUsuario.codigoAsegurado;
    this._mailCliente = datosUsuario.mailCliente;
    this._nombres = datosUsuario.nombres;
    this._apellidos = datosUsuario.apellidos;
    this._ctaBancaria = datosUsuario.ctaBancaria;
    this._codBanco = datosUsuario.codBanco;
    this._nombreBanco = datosUsuario.nombreBanco;
    this._codigoIsapre = datosUsuario.codigoIsapre;
    this._estado = datosUsuario.estado;

    this._poliza = datosUsuario.polizas.poliza;
    this._rutEmpresa = datosUsuario.polizas.rutEmpresa;

    datosUsuario.polizas.coberturas.forEach((cobertura) => {
      this._coberturas.push(cobertura);
    });

    const titularCarga: IBeneficiario = {
      rut: rut,
      dv: dv,
      nombres: datosUsuario.nombres,
      apellidos: datosUsuario.apellidos,
      codParentesco: 0,
      parentesco: 'YO',
      estado: datosUsuario.estado,
      esSeleccionado: false
    }
    this._cargas.push(titularCarga);

    if (datosUsuario.polizas.cargas !== []) {
      datosUsuario.polizas.cargas.forEach((carga) => {
        const nuevaCarga: IBeneficiario = {
          rut: carga.rut,
          dv: carga.dv,
          nombres: carga.nombres,
          apellidos: carga.apellidos,
          codParentesco: carga.codParentesco,
          parentesco: carga.parentesco,
          estado: carga.estado,
          esSeleccionado: false
        }

        this._cargas.push(nuevaCarga);
      })
    }
  }

  public get nombreCompleto(): string {
    return this._nombres + ' ' + this._apellidos;
  }

  public get nombreAbreviado() {
    return this._nombres.split(' ')[0] + ' ' + this._apellidos.split(' ')[0];
  }

  public get nombres(): string {
    return this._nombres;
  }

  public get apellidos(): string {
    return this._apellidos;
  }

  public get iniciales(): string {
    return this._nombres.charAt(0) + this._apellidos.charAt(0);
  }

  public get rutCuerpo(): string {
    return this.cargas[0].rut;
  }

  public get rutDigitoVerificador(): string {
    return this.cargas[0].dv;
  }

  public get rutTitular(): string {
    return (this.cargas[0].rut + '-' + this.cargas[0].dv).replace(/[.-]/g, '').replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
  }

  public get coberturasTitular(): number[] {
    const coberturas: number[] = [];
    this.coberturas.forEach((cobertura) => {
      coberturas.push(cobertura.idCobertura);
    })
    return coberturas;
  }

  public get mailCliente(): string {
    return this._mailCliente.toLocaleLowerCase();
  }

  public get rutEmpresa(): string {
    return this._rutEmpresa;
  }

  public get nombreBanco(): string {
    return this._nombreBanco;
  }

  public get ctaBancaria(): string {
    return this._ctaBancaria;
  }

  public get coberturas(): ICobertura[] {
    return this._coberturas;
  }

  public get cargas(): IBeneficiario[] {
    return this._cargas;
  }

  public get codigoAsegurado(): number {
    return this._codigoAsegurado;
  }

  public get poliza(): string {
    return this._poliza;
  }

  public get codBanco(): number {
    return this._codBanco;
  }

  public get codigoIsapre(): string {
    return this._codigoIsapre;
  }

  public get estado(): string {
    return this._estado;
  }

  public get historial(): Historico[] {
    return this._historial;
  }

  public set historial(historial: Historico[]) {
    this._historial = historial;
  }

  public reiniciarEstadoCargas() {
    this.cargas.forEach((carga) => {
      carga.esSeleccionado = false;
    });
  }

  public obtenerUsuarioSeleccionado(): IBeneficiario {
    return this._cargas.filter(carga => carga.esSeleccionado === true)[0];
  }

  public obtenerIniciales(nombres: string, apellidos: string): string {
    return nombres.charAt(0) + apellidos.charAt(0);
  }

  public obtenerNombreAbreviado(nombres: string, apellido: string): string {
    return nombres.split(' ')[0] + ' ' + apellido.split(' ')[0];
  }
}