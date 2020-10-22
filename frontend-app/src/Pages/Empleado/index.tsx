import React, { Component } from 'react'; // let's also import Component
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { EmpleadoInt } from '../../interfaces/empleadoint';
import { request } from '../../functions';
import { NavLink } from 'react-router-dom';
import { EMPLEADO_URL } from '../../constants';
import IndexEmpleado from './page';
import loadingAction from '../../store/actions/loadingAction';
import { connect } from 'react-redux';


// the clock's state has one field: The current time, based upon the
// JavaScript class Date

type Iprops = {
    [key: string]: any
}

type EmpleadoState = {
    empleados: Array<EmpleadoInt>,
    sinempleados: boolean
}


// Clock has no properties, but the current state is of type EmpleadoState
// The generic parameters in the Component typing allow to pass props
// and state. Since we don't have props, we pass an empty object.
class Empleado extends Component<Iprops, EmpleadoState> {

    constructor(props: Iprops) {
        super(props);
        this.state = {
            empleados: [],
            sinempleados: false
        }

        this.eliminarEmpleado = this.eliminarEmpleado.bind(this)
        this.deleteEmpleado = this.deleteEmpleado.bind(this)
        this.load();
    }

    // The tick function sets the current state. TypeScript will let us know
    // which ones we are allowed to set.
    async load() {

        this.props.loadingAction(true);

        let response = await request(EMPLEADO_URL, "get");

        if (response.status !== false) {
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
        this.props.loadingAction(false);
    }

    async eliminarEmpleado(id: string) {
        this.props.loadingAction(true);
        let response = await request(EMPLEADO_URL + '/' + id, "delete");
        this.props.loadingAction(false);
        if (response.status !== false) {

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
            cancelButtonText: 'Cancelar',
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

        return (
            !this.state.sinempleados
                ?
                <IndexEmpleado
                    empleados={this.state.empleados}
                    deleteEmpleado={this.deleteEmpleado}
                />
                :
                <div className="indexcont">
                    <h1>Listado de Empleados</h1>
                    <div className="buttonlist">
                        <NavLink exact={true} className='button' to='/empleado/edit'>
                            <FontAwesomeIcon icon={faPlus} />
                            Crear empleado
                        </NavLink>
                    </div>
                    <p className="text-center">Sin empleados.</p>
                </div>
        )
    }
}

const mapDispatchToProps = {
    loadingAction,
}

export default connect(null, mapDispatchToProps)(Empleado);

// export default Empleado;