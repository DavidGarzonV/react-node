import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { EmpleadoEntity } from '../../entities/empleado/empleado.entity';

export class EmpleadoRepository {

    getAllEmpleados(): Promise<EmpleadoEntity[]> {
        return getManager().getRepository(EmpleadoEntity).find({ relations: ["company"] });
    }

    getEmpleadoById(id: string): Promise<EmpleadoEntity> {
        return getManager().getRepository(EmpleadoEntity).findOne(id, { relations: ["company"] });
    }

    newEmpleado(empleado: EmpleadoEntity): Promise<EmpleadoEntity> {
        return getManager().getRepository(EmpleadoEntity).save(empleado);
    }

    async updateEmpleado(id: string, empleado: EmpleadoEntity): Promise<UpdateResult> {
        return getManager().getRepository(EmpleadoEntity).update(id, empleado);
    }

    deleteEmpleado(id: string): Promise<DeleteResult> {
        return getManager().getRepository(EmpleadoEntity).delete(id);
    }

}
