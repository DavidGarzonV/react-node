import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faReply } from '@fortawesome/free-solid-svg-icons';

type IProps = {
    handleSubmit: any,
    handleChange: any,
    name: string,
    nit: string,
    tipo: string,
    id: string,
    combo: any,
}


const FormEdit = (props: IProps) => {

    return (
        <div className="indexcont">
            <NavLink exact={true} to="/empresa">
                <FontAwesomeIcon icon={faReply} />
            </NavLink>
            <form onSubmit={props.handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input type="text" name="name" required onChange={props.handleChange} value={props.name} />
                </div>
                <div>
                    <label>Nit:</label>
                    <input type="text" name="nit" required onChange={props.handleChange} value={props.nit} />
                </div>
                <div>
                    <label>Tipo:</label>
                    <select name="tipo" required onChange={props.handleChange} value={props.tipo}>
                        <option value="">-- Ninguno --</option>
                        <option value="pequenia">Pequeña</option>
                        <option value="mediana">Mediana</option>
                        <option value="grande">Grande</option>
                    </select>
                </div>
                <div>
                    <label>Contacto principal:</label>
                    {props.combo}
                </div>
                <input type="hidden" name="id" onChange={props.handleChange} value={props.id} />
                <input className="saveButton" type="submit" value="Guardar" />
            </form>
        </div>
    )

}

export default FormEdit;