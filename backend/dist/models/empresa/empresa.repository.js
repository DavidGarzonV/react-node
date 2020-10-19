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
exports.EmpresaRepository = void 0;
const typeorm_1 = require("typeorm");
const empresa_entity_1 = require("./empresa.entity");
class EmpresaRepository {
    getAllEmpresas() {
        return typeorm_1.getManager().getRepository(empresa_entity_1.EmpresaEntity).find({ relations: ["contacto"] });
    }
    getEmpresaById(id) {
        return typeorm_1.getManager().getRepository(empresa_entity_1.EmpresaEntity).findOne(id, { relations: ["contacto"] });
    }
    newEmpresa(empresa) {
        return typeorm_1.getManager().getRepository(empresa_entity_1.EmpresaEntity).save(empresa);
    }
    updateEmpresa(id, empresa) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeorm_1.getManager().getRepository(empresa_entity_1.EmpresaEntity).update(id, empresa);
        });
    }
    deleteEmpresa(id) {
        return typeorm_1.getManager().getRepository(empresa_entity_1.EmpresaEntity).delete(id);
    }
}
exports.EmpresaRepository = EmpresaRepository;
//# sourceMappingURL=empresa.repository.js.map