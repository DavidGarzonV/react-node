import { EmpleadoInt } from './../empleado/empleadoint';

export type EmpresaInt = {
    [key: string]: any,
    id: string,
    name: string,
    nit: string,
    tipo: string,
    contacto: EmpleadoInt | null
}