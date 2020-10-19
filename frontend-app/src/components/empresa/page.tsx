import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { faEdit, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { EmpresaInt } from '../../interfaces/empresaint';

type IProps = {
    empresas: EmpresaInt[],
    deleteEmpresa: Function
}

const IndexEmpresa = (props: IProps) => {

    return (
        <div className="indexcont" >
            <h1>Listado de Empresas</h1>
            <div className="buttonlist">
                <NavLink exact={true} className='button' to='/empresa/edit'>
                    <FontAwesomeIcon icon={faPlus} />
                    Crear empresa
                </NavLink>
            </div>
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nombre(s)</th>
                            <th>Nit</th>
                            <th>Tipo</th>
                            <th>Contacto</th>
                            <th>
                                <FontAwesomeIcon icon={faEdit} />
                            </th>
                            <th>
                                <FontAwesomeIcon icon={faTrash} />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.empresas.map((empresa, index) => {
                            return (
                                <tr key={empresa.id}>
                                    <td className="text-center">{empresa.name}</td>
                                    <td className="text-center">{empresa.nit}</td>
                                    <td className="text-center">{empresa.tipo}</td>
                                    <td className="text-center">{empresa.contacto?.name}</td>
                                    <td className="text-center">
                                        <NavLink exact={true} to={"/empresa/edit/" + empresa.id}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </NavLink>
                                    </td>
                                    <td className="text-center">
                                        <a onClick={(event) => props.deleteEmpresa(event, empresa.id)}>
                                            <FontAwesomeIcon icon={faTrash} />
                                        </a>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div >
    )
}

export default IndexEmpresa;