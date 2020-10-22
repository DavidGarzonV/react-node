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
exports.deleteEmpresa = exports.updateEmpresa = exports.newEmpresa = exports.getEmpresaById = exports.getAllEmpresas = void 0;
const empresa_repository_1 = require("./../../repositories/empresa/empresa.repository");
const empresa_entity_1 = require("../../entities/empresa/empresa.entity");
const empleado_repository_1 = require("../../repositories/empleado/empleado.repository");
const catch_1 = __importDefault(require("../../exports/catch"));
const repository = new empresa_repository_1.EmpresaRepository();
const empleadoRepository = new empleado_repository_1.EmpleadoRepository();
exports.getAllEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getAllEmpresas();
    res.send(result);
});
exports.getEmpresaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getEmpresaById(req.params.id);
    if (result == undefined) {
        res.json({ error: "La empresa no existe" });
    }
    else {
        res.send(result);
    }
});
exports.newEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    var contacto = null;
    if (body.contacto !== "" && body.contacto !== null) {
        contacto = yield empleadoRepository.getEmpleadoById(body.contacto);
    }
    const empresa = new empresa_entity_1.EmpresaEntity(body.id, body.name, body.nit, body.tipo, contacto);
    const result = yield repository.newEmpresa(empresa);
    res.send(result);
});
exports.updateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    var contacto = null;
    if (body.contacto !== undefined && body.contacto !== "" && body.contacto !== null) {
        contacto = yield empleadoRepository.getEmpleadoById(body.contacto);
    }
    const empresa = new empresa_entity_1.EmpresaEntity(req.params.id, body.name, body.nit, body.tipo, contacto);
    const result = yield repository.updateEmpresa(req.params.id, empresa);
    res.send(result);
});
exports.deleteEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield repository.deleteEmpresa(req.params.id);
        const empresas = yield repository.getAllEmpresas();
        res.send(empresas);
    }
    catch (error) {
        catch_1.default(error, res);
    }
});
//# sourceMappingURL=empresaController.js.map