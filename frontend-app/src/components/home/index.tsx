import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';

export class Home extends Component {   
    render() {
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
}