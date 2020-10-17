import { EmpresaInt } from './../empresa/empresaint';

export type EmpleadoInt = {
    [key: string]: any,
    id: string,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    company: EmpresaInt | null
}