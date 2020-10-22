import { EmpresaRepository } from './../../repositories/empresa/empresa.repository';
import { EmpleadoRepository } from '../../repositories/empleado/empleado.repository';
import { EmpleadoEntity } from '../../entities/empleado/empleado.entity';
import catchFunction from '../../exports/catch';

const repository = new EmpleadoRepository();
const empresaRepository = new EmpresaRepository();

export const getAllEmpleados = async (req: any, res: any) => {
    const result = await repository.getAllEmpleados();
    res.send(result);
}

export const getEmpleadoById = async (req: any, res: any) => {
    var result = await repository.getEmpleadoById(req.params.id);
    if (result == undefined) {
        res.json({ error: "El empleado no existe" });
    } else {
        res.send(result);
    }
}

export const newEmpleado = async (req: any, res: any) => {
    const body = req.body;

    var company = null;
    if (body.company !== "" && body.company !== null) {
        company = await empresaRepository.getEmpresaById(body.company);
    }
    try {
        const empleado = new EmpleadoEntity(body.id, body.name, body.last_name, body.phone, body.email, company);
        const result = await repository.newEmpleado(empleado);
        res.send(result);
    } catch (error) {
        catchFunction(error, res);
    }

}

export const updateEmpleado = async (req: any, res: any) => {
    const body = req.body;

    var company = null;
    if (body.company !== "" && body.company !== "" && body.company !== null) {
        company = await empresaRepository.getEmpresaById(body.company);
    }

    const empleado = new EmpleadoEntity(req.params.id, body.name, body.last_name, body.phone, body.email, company);
    const result = await repository.updateEmpleado(req.params.id, empleado);
    res.send(result);
}

export const deleteEmpleado = async (req: any, res: any) => {
    try {
        const result = await repository.deleteEmpleado(req.params.id);
        const empleados = await repository.getAllEmpleados();
        res.send(empleados);
    } catch (error) {
        catchFunction(error, res);
    }
}