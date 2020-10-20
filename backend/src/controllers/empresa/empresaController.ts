import { EmpresaRepository } from './../../repositories/empresa/empresa.repository';
import { EmpresaEntity } from '../../entities/empresa/empresa.entity';
import { EmpleadoRepository } from '../../repositories/empleado/empleado.repository';
import catchFunction from '../../exports/catch';

const repository = new EmpresaRepository();
const empleadoRepository = new EmpleadoRepository();

export const getAllEmpresas = async (req: any, res: any) => {
    const result = await repository.getAllEmpresas();
    res.send(result);
}

export const getEmpresaById = async (req: any, res: any) => {
    const result = await repository.getEmpresaById(req.params.id);
    if (result == undefined) {
        res.json({ error: "La empresa no existe" });
    } else {
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
    if (body.contacto !== undefined && body.contacto !== "") {
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
        catchFunction(error, res);
    }
}