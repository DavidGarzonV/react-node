import { AutocompleteOption } from './autocomplete';
import { EmpleadoInt } from './empleadoint';

export interface EmpresaInt {
    [key: string]: any,
    id: string,
    name: string,
    nit: string,
    tipo: string,
    contacto: EmpleadoInt | null
}