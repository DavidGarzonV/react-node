"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
class UserRepository {
    getAllUsers() {
        return typeorm_1.getManager().getRepository(user_entity_1.UserEntity).find();
    }
    getUserById(id) {
        return typeorm_1.getManager().getRepository(user_entity_1.UserEntity).findOne(id);
    }
    newUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeorm_1.getManager().getRepository(user_entity_1.UserEntity).save(user);
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeorm_1.getManager().getRepository(user_entity_1.UserEntity).update(id, user);
        });
    }
    deleteUser(id) {
        return typeorm_1.getManager().getRepository(user_entity_1.UserEntity).delete(id);
    }
    validateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield typeorm_1.getManager().getRepository(user_entity_1.UserEntity).find({ where: { user: user } });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map