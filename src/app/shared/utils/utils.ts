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
      const arrayFecha = fecha.split('/');
      const dia = +arrayFecha[1] > 9 ? arrayFecha[1] : `0${arrayFecha[1]}`
      const mes = +arrayFecha[0] > 9 ? arrayFecha[0] : `0${arrayFecha[0]}`
      return `${dia}/${mes}/${arrayFecha[2]}`;
    } else if (formato === 'DD/MM/YYYY') {
      return fecha.replace(/-/g, '/');
    } else {
      return fecha.replace(/-/g, '/');
    }
  }

  private static generarFormatoFecha(): string {
    let fechaLocal = (new Date(2022, 11, 31)).toLocaleDateString();
    fechaLocal = fechaLocal.replace("31","DD").replace("12","MM").replace("2022","YYYY");
    return fechaLocal.replace(/-/g, '/');
  }
}
