import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { EmpresaInt } from '../../interfaces/empresaint';
import { AutocompleteOption } from '../../interfaces/autocomplete';
import ComboBox from '../../components/Form/autocomplete';


type IProps = {
    handleSubmit: any,
    handleChange: any,
    changeBox: any,
    empresas: AutocompleteOption[],
    company: EmpresaInt | null | AutocompleteOption,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    id: string,
    validate?:boolean | string
}

const FormEdit = (props: IProps) => {

    return (
        <div className="indexcont">
            <NavLink exact={true} to="/empleado">
                <FontAwesomeIcon icon={faReply} />
            </NavLink>
            {props.validate !== false && 
                <p className="alertMessage">
                    <span className="alert error">{props.validate}</span>
                </p>
            }
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" required onChange={props.handleChange} value={props.name} />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input type="text" name="last_name" required onChange={props.handleChange} value={props.last_name} />
                </div>
                <div>
                    <label>Teléfono:</label>
                    <input type="number" name="phone" onChange={props.handleChange} value={props.phone} />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" required onChange={props.handleChange} value={props.email} />
                </div>
                <div>
                    <label>Empresa:</label>
                    <ComboBox options={props.empresas} name="company" value={props.company} label="Empresa" setInput={props.changeBox} />
                </div>
                <input type="hidden" name="id" onChange={props.handleChange} value={props.id} />
                <input className="saveButton" type="submit" value="Guardar" />
            </form>
        </div>
    )
}

export default FormEdit;