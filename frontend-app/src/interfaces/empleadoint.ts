import { AutocompleteOption } from './autocomplete';
import { EmpresaInt } from './empresaint';

export interface EmpleadoInt {
    [key: string]: any,
    id: string,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    company: EmpresaInt | null
}