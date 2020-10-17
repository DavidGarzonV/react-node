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
exports.deleteEmpresa = exports.updateEmpresa = exports.newEmpresa = exports.getEmpresaById = exports.getAllEmpresas = void 0;
const empresa_entity_1 = require("../models/empresa/empresa.entity");
const empresa_repository_1 = require("../models/empresa/empresa.repository");
const repository = new empresa_repository_1.EmpresaRepository();
exports.getAllEmpresas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getAllEmpresas();
    res.send(result);
});
exports.getEmpresaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getEmpresaById(req.body.id);
    res.send(result);
});
exports.newEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const empresa = new empresa_entity_1.EmpresaEntity(body.id, body.name, body.nit, body.tipo, body.contacto);
    const result = yield repository.newEmpresa(empresa);
    res.send(result);
});
exports.updateEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const empresa = new empresa_entity_1.EmpresaEntity(req.params.id, body.name, body.nit, body.tipo, body.contacto);
    const result = yield repository.updateEmpresa(req.params.id, empresa);
    res.send(result);
});
exports.deleteEmpresa = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.deleteEmpresa(req.params.id);
    const empresas = yield repository.getAllEmpresas();
    res.send(empresas);
});
//# sourceMappingURL=empresaController.js.map