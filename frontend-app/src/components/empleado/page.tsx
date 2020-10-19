import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import { EmpleadoInt } from '../../interfaces/empleadoint';

type IProps = {
    empleados: Array<EmpleadoInt>,
    deleteEmpleado: Function
}

const IndexEmpleado = (props: IProps) => {

    return (
        <div className="indexcont">
            <h1>Listado de Empleados</h1>
            <div className="buttonlist">
                <NavLink exact={true} className='button' to='/empleado/edit'>
                    <FontAwesomeIcon icon={faPlus} />
                    Crear empleado
                </NavLink>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre(s)</th>
                            <th>Apellido</th>
                            <th>Teléfono</th>
                            <th>Email</th>
                            <th>Empresa</th>
                            <th>
                                <FontAwesomeIcon icon={faEdit} />
                            </th>
                            <th>
                                <FontAwesomeIcon icon={faTrash} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.empleados.map((empleado, index) => {
                            return (
                                <tr key={empleado.id}>
                                    <td className="text-center">{empleado.name}</td>
                                    <td className="text-center">{empleado.last_name}</td>
                                    <td className="text-center">{empleado.phone}</td>
                                    <td className="text-center">{empleado.email}</td>
                                    <td className="text-center">{empleado.company?.name}</td>
                                    <td className="text-center">
                                        <NavLink exact={true} to={"/empleado/edit/" + empleado.id}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </NavLink>
                                    </td>
                                    <td className="text-center">
                                        <a href="/#" onClick={(event) => props.deleteEmpleado(event, empleado.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default IndexEmpleado;