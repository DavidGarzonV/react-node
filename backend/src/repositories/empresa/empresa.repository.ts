import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { EmpresaEntity } from '../../entities/empresa/empresa.entity';

export class EmpresaRepository {

    getAllEmpresas(): Promise<EmpresaEntity[]> {
        return getManager().getRepository(EmpresaEntity).find({ relations: ["contacto"] });
    }

    getEmpresaById(id: string): Promise<EmpresaEntity> {
        return getManager().getRepository(EmpresaEntity).findOne(id,{ relations: ["contacto"] });
    }

    newEmpresa(empresa: EmpresaEntity): Promise<EmpresaEntity> {
        return getManager().getRepository(EmpresaEntity).save(empresa);
    }

    async updateEmpresa(id: string, empresa: EmpresaEntity): Promise<UpdateResult> {
        return getManager().getRepository(EmpresaEntity).update(id, empresa);
    }

    deleteEmpresa(id: string): Promise<DeleteResult> {
        return getManager().getRepository(EmpresaEntity).delete(id);
    }

}
