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
exports.EmpleadoRepository = void 0;
const typeorm_1 = require("typeorm");
const empleado_entity_1 = require("./empleado.entity");
class EmpleadoRepository {
    getAllEmpleados() {
        return typeorm_1.getManager().getRepository(empleado_entity_1.EmpleadoEntity).find({ relations: ["company"] });
    }
    getEmpleadoById(id) {
        return typeorm_1.getManager().getRepository(empleado_entity_1.EmpleadoEntity).findOne(id);
    }
    newEmpleado(empleado) {
        return typeorm_1.getManager().getRepository(empleado_entity_1.EmpleadoEntity).save(empleado);
    }
    updateEmpleado(id, empleado) {
        return __awaiter(this, void 0, void 0, function* () {
            return typeorm_1.getManager().getRepository(empleado_entity_1.EmpleadoEntity).update(id, empleado);
        });
    }
    deleteEmpleado(id) {
        return typeorm_1.getManager().getRepository(empleado_entity_1.EmpleadoEntity).delete(id);
    }
}
exports.EmpleadoRepository = EmpleadoRepository;
//# sourceMappingURL=empleado.repository.js.map