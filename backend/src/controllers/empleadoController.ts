import { PG_FOREIGN_KEY_VIOLATION } from './../exports/postgres-errors';
import { EmpresaRepository } from './../models/empresa/empresa.repository';
import { EmpleadoEntity } from '../models/empleado/empleado.entity';
import { EmpleadoRepository } from '../models/empleado/empleado.repository';

const repository = new EmpleadoRepository();
const empresaRepository = new EmpresaRepository();

export const getAllEmpleados = async (req: any, res: any) => {
    const result = await repository.getAllEmpleados();
    res.send(result);
}

export const getEmpleadoById = async (req: any, res: any) => {
    var result = await repository.getEmpleadoById(req.body.id);
    if (result == undefined) {
        res.json({error: "El empleado no existe"});
    }else{
        res.send(result);
    }
}

export const newEmpleado = async (req: any, res: any) => {
    const body = req.body;

    var company = null;
    if (body.company != "") {
        company = await empresaRepository.getEmpresaById(body.company);
    }

    const empleado = new EmpleadoEntity(body.id, body.name, body.last_name, body.phone, body.email, company);
    const result = await repository.newEmpleado(empleado);
    res.send(result);
}

export const updateEmpleado = async (req: any, res: any) => {
    const body = req.body;

    var company = null;
    if (body.company != "") {
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
        // If user already exists
        if (error.code === PG_FOREIGN_KEY_VIOLATION) {
            res.json({ error: "El empleado ya se encuentra asociado a una o varias empresas" });
        } else {
            res.json({ error: error.code });
        }
    }
}