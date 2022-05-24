import { Beneficiario } from './../interfaces/beneficiario';
// import { UsuarioAPI } from './usuario-api';

export class Usuario {
    private readonly _nombres: string;
    private readonly _apellidos: string;
    private readonly _mailCliente: string;
    private readonly _rutEmpresa: string;
    private readonly _cargas: Beneficiario[];
    private readonly _nombreBanco: string;
    private readonly _ctaBancaria: string;
    private readonly _idsCoberturas: any[];
    private readonly _descripcionCoberturas: any[];
  
    private readonly _codigoAsegurado: number;
    private readonly _poliza: string;
    private readonly _polizas: any;
  
    private readonly _codBanco: number;
    private readonly _rutCarga: string
    private readonly _dvCarga: string
    private readonly _nombresCarga: string
    private readonly _apellidosCarga: string
    private readonly _fechaNacimientoCarga: Date
    private readonly _codParentesco!: number
    private readonly _parentescoCarga: string
    private readonly _codigoIsapre: string;
    private readonly _estadoTitular: boolean;
    private readonly _estadoCarga: string;
    private readonly _codigoParentescoCarga: string;
  
    constructor(datosUsuario: any) {
      this._codBanco = datosUsuario.additionalUserData.codBanco;
      this._nombres = datosUsuario.additionalUserData.nombres;
      this._apellidos = datosUsuario.additionalUserData.apellidos;
      this._rutEmpresa = datosUsuario.additionalUserData.polizas.rutEmpresa;
      this._mailCliente = datosUsuario.additionalUserData.mailCliente;
      this._nombreBanco = datosUsuario.additionalUserData.nombreBanco;
      this._ctaBancaria = datosUsuario.additionalUserData.ctaBancaria;
      this._idsCoberturas =
        datosUsuario.additionalUserData.polizas.coberturas.map(
          (cobertura) => cobertura.idCobertura
        );
      this._codigoAsegurado = datosUsuario.additionalUserData.codigoAsegurado;
      this._poliza = datosUsuario.additionalUserData.polizas.poliza;
      this._polizas = datosUsuario.additionalUserData.polizas;
      this._cargas = datosUsuario.additionalUserData.polizas.cargas;
  
      this._rutCarga = datosUsuario.cargas
      this._dvCarga = datosUsuario.cargas
      this._nombresCarga = datosUsuario.cargas
      this._apellidosCarga = datosUsuario.cargas
      this._fechaNacimientoCarga =datosUsuario.cargas
      this._codigoParentescoCarga = datosUsuario.cargas
      this._parentescoCarga = datosUsuario.cargas
      this._codigoIsapre = datosUsuario.additionalUserData.codigoIsapre;
      this._descripcionCoberturas = datosUsuario.additionalUserData.polizas.coberturas.map(
        (cobertura) => cobertura.descripcion
      );
      this._estadoTitular =
        datosUsuario.additionalUserData.estado === 'Activo' ? true : false;
      this._estadoCarga = datosUsuario.additionalUserData.estadoCarga;
  
      let beneficiario: any = {
        nombre: this._nombres,
        apellido: this._apellidos,
        parentesco: 'Yo',
        esActivo: this._estadoTitular,
        coberturas: this._descripcionCoberturas,
        codigoCobertura: datosUsuario.additionalUserData.codigoCobertura,
      };
    }
  
    get getPolizas(){
      return this._polizas;
    }
  
    get nombreCompleto(): string {
      return this._nombres + ' ' + this._apellidos;
    }
  
    get primerNombre(): string {
      return this._nombres.split(' ')[0];
    }
    get primerApelido(): string {
      return this._apellidos.split(' ')[0];
    }
    
    get segundoApelido(): string {
      return this._apellidos?.split(' ')?.length > 1 ? this._apellidos.split(' ')[1] : '';
    }
  
    get apellidos(): string {
      return this._apellidos?.split(' ')?.length > 1 ? this._apellidos.split(' ')[1] : '';
    }
  
    get nombreAbreviado() {
      return this._nombres.split(' ')[0] + ' ' + this._apellidos.split(' ')[0];
    }
    get rutEmpresa(): string {
      return this._rutEmpresa;
    }
    get email(): string {
      return this._mailCliente;
    }
  
    get iniciales(): string {
      return this._nombres.charAt(0) + this._apellidos.charAt(0);
    }
  
    get cargas(): Beneficiario[] {
      return this._cargas;
    }
  
    get descripcionCobertura(): number[] {
      return this._descripcionCoberturas;
    }
  
    get codigoCobertura(): number[] {
      return this._idsCoberturas;
    }
  
    get numeroCuenta(): string {
      return this._ctaBancaria;
    }
    get nombreBanco(): string {
      return this._nombreBanco;
    }
  
    get codigoBanco(): number {
      return this._codBanco
    }
  
    get parentesco(): string {
      return 'Yo';
    }
  
    get getPoliza(): string {
      return this._polizas.poliza;
    }
  
    get estadoTitular():boolean {
      return this._estadoTitular
    }
  
    get getIdsCoberturas():number[]{
      return this._idsCoberturas;
    }
  
    get codigoAsegurado():number{
      return this._codigoAsegurado;
    }
    
    get idIsapre():string {
      return this._codigoIsapre;
    }
  }
  