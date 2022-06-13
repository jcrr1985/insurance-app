export default class Utils {

  public static async transformarABase64(file : any): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  public static formatearFecha(fecha: string) {
    const formato = this.generarFormatoFecha();
    if (formato === 'MM/DD/YYYY') {
      const arrayFecha = fecha.replace(/-/g, '/').split('/');
      const dia = +arrayFecha[1] > 9 ? arrayFecha[1] : `0${arrayFecha[1]}`
      const mes = +arrayFecha[0] > 9 ? arrayFecha[0] : `0${arrayFecha[0]}`
      const fechaEscogida = new Date();
      fechaEscogida.setFullYear(+arrayFecha[2]);
      fechaEscogida.setMonth((+mes) - 1);
      fechaEscogida.setDate(+dia);
      return fechaEscogida;
    } else if (formato === 'DD/MM/YYYY') {
      const arrayFecha = fecha.replace(/-/g, '/').split('/');
      const fechaEscogida = new Date();
      fechaEscogida.setFullYear(+arrayFecha[2]);
      fechaEscogida.setMonth((+arrayFecha[1]) - 1);
      fechaEscogida.setDate(+arrayFecha[0]);
      return fechaEscogida;
    } else {
      return fecha.replace(/-/g, '/');
    }
  }

  private static generarFormatoFecha(): string {
    let fechaLocal = (new Date(2022, 11, 31)).toLocaleDateString();
    fechaLocal = fechaLocal.replace("31","DD").replace("12","MM").replace("2022","YYYY");
    return fechaLocal.replace(/-/g, '/');
  }
  public static generarFecha() {
    const objetoFecha = new Date();
    const anoAnterior = objetoFecha.getFullYear() - 3;

    const fechaActual = objetoFecha.toISOString().split('T')[0];
    objetoFecha.setFullYear(anoAnterior);
    const fechaInicio = objetoFecha.toISOString().split('T')[0];

    return [fechaInicio, fechaActual];
  }
}

const formatter = new Intl.NumberFormat('es-CL');

export function formateoValor(valor: number) {
  if (valor < 1) return '$0';
  return '$' + formatter.format(valor);
}
