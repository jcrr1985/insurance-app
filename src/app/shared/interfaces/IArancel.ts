export interface IArancel {
  codigo: string;
  nombre: string;
  sesiones: number;
  montoTotal: number;
  descuento: number;
  flagSesionValida: boolean;
  montoComparacion: number;
}
