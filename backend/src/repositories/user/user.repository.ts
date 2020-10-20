import { getManager, UpdateResult, DeleteResult } from 'typeorm';
import { UserEntity } from '../../entities/user/user.entity';

export class UserRepository {

    getAllUsers(): Promise<UserEntity[]> {
        return getManager().getRepository(UserEntity).find();
    }

    getUserById(id: string): Promise<UserEntity> {
        return getManager().getRepository(UserEntity).findOne(id);
    }

    async newUser(user: UserEntity): Promise<UserEntity> {
        return getManager().getRepository(UserEntity).save(user);
    }

    async updateUser(id: string, user: UserEntity): Promise<UpdateResult> {
        return getManager().getRepository(UserEntity).update(id, user);
    }

    deleteUser(id: string): Promise<DeleteResult> {
        return getManager().getRepository(UserEntity).delete(id);
    }
    
    async validateUser(user: string): Promise<any> {
       return await getManager().getRepository(UserEntity).find({ where: { user: user } });
    }

}
