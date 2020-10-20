"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.newUser = exports.getUserById = exports.getAllUsers = void 0;
const user_entity_1 = require("../entities/user/user.entity");
const user_repository_1 = require("../repositories/user/user.repository");
const bcrypt = __importStar(require("bcryptjs"));
const postgres_errors_1 = require("../exports/postgres-errors");
const repository = new user_repository_1.UserRepository();
exports.getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getAllUsers();
    res.send(result);
});
exports.getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.getUserById(req.body.id);
    res.send(result);
});
exports.newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const password = yield bcrypt.hash(body.pass, 8);
    const user = new user_entity_1.UserEntity(body.id, body.name, body.user, password);
    try {
        const result = yield repository.newUser(user);
        const { pass } = result, temp = __rest(result, ["pass"]);
        res.send(temp);
    }
    catch (error) {
        // If user already exists
        if (error.code === postgres_errors_1.PG_UNIQUE_VIOLATION) {
            res.json({ error: "El usuario ya existe" });
        }
        else {
            res.json({ error: error.code });
        }
    }
});
exports.updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const user = new user_entity_1.UserEntity(body.id, body.name, body.user, body.pass);
    const result = yield repository.updateUser(req.body.id, user);
    res.send(result);
});
exports.deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield repository.deleteUser(req.body.id);
    res.send(result);
});
//# sourceMappingURL=userController.js.map