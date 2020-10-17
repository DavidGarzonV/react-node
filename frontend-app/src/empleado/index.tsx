import React, { Component } from 'react'; // let's also import Component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { EmpleadoInt } from './empleadoint';
import { request } from '../funciones';
import { NavLink } from 'react-router-dom';
import { EMPLEADO_URL } from '../constants';
import Swal from 'sweetalert2';

// the clock's state has one field: The current time, based upon the
// JavaScript class Date

type EmpleadoState = {
    empleados: Array<EmpleadoInt>,
    sinempleados: boolean
}


// Clock has no properties, but the current state is of type EmpleadoState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
export class Empleado extends Component<{}, EmpleadoState> {

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    async load() {

        let response = await request(EMPLEADO_URL, "get");
        if (response !== false) {
            this.setState({
                empleados: response.data,
                sinempleados: response.data.length === 0
            });
        } else {
            this.setState({
                empleados: [],
                sinempleados: true
            });
        }
    }

    // Before the component mounts, we initialise our state
    componentWillMount() {
        this.setState({
            empleados: [],
            sinempleados: false
        });
        this.load();
    }

    async eliminarEmpleado(id: string) {
        let response = await request(EMPLEADO_URL + '/' + id, "delete");
        if (response !== false) {

            if (response.data.error) {
                Swal.fire("Error", response.data.error, "error");
            } else {
                this.setState({
                    empleados: response.data,
                    sinempleados: response.data.length === 0
                });
                Swal.fire("Operación exitosa", "Empleado eliminado correctamente", "success");
            }
        } else {
            alert("Error al eliminar");
        }
    }

    async deleteEmpleado(event: React.MouseEvent, id: string) {
        event.preventDefault();

        Swal.fire({
            title: "Está seguro?",
            text: "Esta acción es irreversible",
            showCancelButton: true,
            cancelButtonText:'Cancelar',
            icon: 'warning',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    this.eliminarEmpleado(id);
                }
            });
    }

    // render will know everything!
    render() {
        if (this.state.empleados.length > 0) {
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
                                {this.state.empleados.map((empleado, index) => {
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
                                                <a onClick={(event) => this.deleteEmpleado(event, empleado.id)}>
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
            );
        } else {
            if (this.state.sinempleados) {
                return (
                    <div className="indexcont">
                        <div className="buttonlist">
                            <NavLink exact={true} className='button' to='/empleado/edit'>
                                <FontAwesomeIcon icon={faPlus} />
                                Crear empleado
                            </NavLink>
                        </div>
                        <p className="text-center">Sin empleados.</p>
                    </div>
                );
            } else {
                return (
                    <div className="indexcont">
                        <p className="text-center">Cargando empleados...</p>
                    </div>
                );
            }
        }
        // return <p>The current time is {this.state.time.toLocaleTimeString()}</p>
    }
}