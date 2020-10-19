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
exports.deleteEmpleado = exports.updateEmpleado = exports.newEmpleado = exports.getEmpleadoById = exports.getAllEmpleados = void 0;
const postgres_errors_1 = require("./../exports/postgres-errors");
const empresa_repository_1 = require("./../models/empresa/empresa.repository");
const empleado_entity_1 = require("../models/empleado/empleado.entity");
const empleado_repository_1 = require("../models/empleado/empleado.repository");
const repository = new empleado_repository_1.EmpleadoRepository();
const empresaRepository = new empresa_repository_1.EmpresaRepository();
exports.getAllEmpleados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getAllEmpleados();
    res.send(result);
});
exports.getEmpleadoById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield repository.getEmpleadoById(req.body.id);
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
        console.log(error.code);
        // If user already exists
        if (error.code === postgres_errors_1.PG_UNIQUE_VIOLATION) {
            res.json({ error: "Error de llave unica" });
        }
        else {
            res.json({ error: error.code });
        }
    }
});
exports.updateEmpleado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    var company = null;
    if (body.company != "") {
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
        // If user already exists
        if (error.code === postgres_errors_1.PG_FOREIGN_KEY_VIOLATION) {
            res.json({ error: "El empleado ya se encuentra asociado a una o varias empresas" });
        }
        else {
            res.json({ error: error.code });
        }
    }
});
//# sourceMappingURL=empleadoController.js.map