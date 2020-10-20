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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmpleado = exports.updateEmpleado = exports.newEmpleado = exports.getEmpleadoById = exports.getAllEmpleados = void 0;
const empresa_repository_1 = require("./../repositories/empresa/empresa.repository");
const empleado_repository_1 = require("../repositories/empleado/empleado.repository");
const empleado_entity_1 = require("../entities/empleado/empleado.entity");
const catch_1 = __importDefault(require("../exports/catch"));
const repository = new empleado_repository_1.EmpleadoRepository();
const empresaRepository = new empresa_repository_1.EmpresaRepository();
exports.getAllEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getAllEmpleados();
    res.send(result);
});
exports.getEmpleadoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield repository.getEmpleadoById(req.params.id);
    if (result == undefined) {
        res.json({ error: "El empleado no existe" });
    }
    else {
        res.send(result);
    }
});
exports.newEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    var company = null;
    if (body.company != "") {
        company = yield empresaRepository.getEmpresaById(body.company);
    }
    try {
        const empleado = new empleado_entity_1.EmpleadoEntity(body.id, body.name, body.last_name, body.phone, body.email, company);
        const result = yield repository.newEmpleado(empleado);
        res.send(result);
    }
    catch (error) {
        catch_1.default(error, res);
    }
});
exports.updateEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    var company = null;
    if (body.company !== "" && body.company !== "") {
        company = yield empresaRepository.getEmpresaById(body.company);
    }
    const empleado = new empleado_entity_1.EmpleadoEntity(req.params.id, body.name, body.last_name, body.phone, body.email, company);
    const result = yield repository.updateEmpleado(req.params.id, empleado);
    res.send(result);
});
exports.deleteEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield repository.deleteEmpleado(req.params.id);
        const empleados = yield repository.getAllEmpleados();
        res.send(empleados);
    }
    catch (error) {
        catch_1.default(error, res);
    }
});
//# sourceMappingURL=empleadoController.js.map