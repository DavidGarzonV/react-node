import { PG_FOREIGN_KEY_VIOLATION } from './../exports/postgres-errors';
import { EmpleadoRepository } from './../models/empleado/empleado.repository';
import { EmpresaEntity } from '../models/empresa/empresa.entity';
import { EmpresaRepository } from '../models/empresa/empresa.repository';

const repository = new EmpresaRepository();
const empleadoRepository = new EmpleadoRepository();

export const getAllEmpresas = async (req: any, res: any) => {
    const result = await repository.getAllEmpresas();
    res.send(result);
}

export const getEmpresaById = async (req: any, res: any) => {
    const result = await repository.getEmpresaById(req.body.id);
    if (result == undefined) {
        res.json({error: "El empleado no existe"});
    }else{
        res.send(result);
    }
}

export const newEmpresa = async (req: any, res: any) => {
    const body = req.body;

    var contacto = null;
    if (body.contacto != "") {
        contacto = await empleadoRepository.getEmpleadoById(body.contacto);
    }

    const empresa = new EmpresaEntity(body.id, body.name, body.nit, body.tipo, contacto);
    const result = await repository.newEmpresa(empresa);
    res.send(result);
}

export const updateEmpresa = async (req: any, res: any) => {
    const body = req.body;

    var contacto = null;
    if (body.contacto != "") {
        contacto = await empleadoRepository.getEmpleadoById(body.contacto);
    }

    const empresa = new EmpresaEntity(req.params.id, body.name, body.nit, body.tipo, contacto);
    const result = await repository.updateEmpresa(req.params.id, empresa);
    res.send(result);
}

export const deleteEmpresa = async (req: any, res: any) => {
    try {
        const result = await repository.deleteEmpresa(req.params.id);
        const empresas = await repository.getAllEmpresas();
        res.send(empresas);
    } catch (error) {
        // If user already exists
        if (error.code === PG_FOREIGN_KEY_VIOLATION) {
            res.json({ error: "La empresa ya se encuentra asociado a uno o varios empleados" });
        } else {
            res.json({ error: error.code });
        }
    }
}