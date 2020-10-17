import { UserEntity } from '../models/user/user.entity';
import { UserRepository } from '../models/user/user.repository';
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcryptjs";

const repository = new UserRepository();

export const login = async (req: any, res: any) => {
    const body = req.body;
    const result = await repository.validateUser(body.user);
    if (result[0] == undefined) {
        res.json({error: 'El usuario no existe'});
    }else{
        bcrypt.compare(body.pass, result[0].pass, (err: Error, match: boolean) => {
            if(match) {
                // passwords match
                    
                const payload = { username: result.user, sub: result.id };
    
                //Sing JWT
                const token = jwt.sign(
                    payload,
                    process.env.JSW_SECRET,
                    {
                        expiresIn: process.env.TOKEN_EXPIRES
                    }
                );
    
                res.json({
                    access_token: token,
                });
                
            } else {
                // passwords do not match
                res.json({
                    access_token: false
                });
            }
        });
    }

}

export const verify = (req: any, res: any) => {
    res.json({status:true});
}