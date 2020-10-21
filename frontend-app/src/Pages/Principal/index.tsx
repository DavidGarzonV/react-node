import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faPlus } from '@fortawesome/free-solid-svg-icons'

const Principal = () => {

    return (

        <div className="loginform">
            <div className="text-center">
                <h1>Bienvenido</h1>
            </div>
            <div className="homebuttons">
                <NavLink exact={true} className='button' to='/empresa/edit'>
                    <FontAwesomeIcon icon={faPlus} />
                    Crear empresa
                </NavLink>
                <NavLink exact={true} className='button' to='/empleado/edit'>
                    <FontAwesomeIcon icon={faPlus} />
                    Crear empleado
                </NavLink>
            </div>
        </div>
    )
}

export default Principal;