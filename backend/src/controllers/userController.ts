import { UserEntity } from '../models/user/user.entity';
import { UserRepository } from '../models/user/user.repository';
import * as bcrypt from "bcryptjs";
import { PG_UNIQUE_VIOLATION } from '../exports/postgres-errors';

const repository = new UserRepository();

export const getAllUsers = async (req: any, res: any) => {
    const result = await repository.getAllUsers();
    res.send(result);
}

export const getUserById = async (req: any, res: any) => {
    const result = await repository.getUserById(req.body.id);
    res.send(result);
}

export const newUser = async (req: any, res: any) => {
    const body = req.body;
    const password = await bcrypt.hash(body.pass, 8);
    const user = new UserEntity(body.id, body.name, body.user, password);

    try {
        const result = await repository.newUser(user);
        const { pass, ...temp } = result;
        res.send(temp);
    } catch (error) {
        // If user already exists
        if (error.code === PG_UNIQUE_VIOLATION) {
            res.json({ error: "El usuario ya existe" });
        } else {
            res.json({ error: error.code });
        }
    }
}

export const updateUser = async (req: any, res: any) => {
    const body = req.body;
    const user = new UserEntity(body.id, body.name, body.user, body.pass);
    const result = await repository.updateUser(req.body.id, user);
    res.send(result);
}

export const deleteUser = async (req: any, res: any) => {
    const result = await repository.deleteUser(req.body.id);
    res.send(result);
}