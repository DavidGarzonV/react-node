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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify = exports.login = void 0;
const user_repository_1 = require("../repositories/user/user.repository");
const jwt = __importStar(require("jsonwebtoken"));
const bcrypt = __importStar(require("bcryptjs"));
const repository = new user_repository_1.UserRepository();
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const result = yield repository.validateUser(body.user);
    if (result[0] == undefined) {
        res.json({ error: 'El usuario no existe' });
    }
    else {
        bcrypt.compare(body.pass, result[0].pass, (err, match) => {
            if (match) {
                // passwords match
                const payload = { username: result.user, sub: result.id };
                //Sing JWT
                const token = jwt.sign(payload, process.env.JSW_SECRET, {
                    expiresIn: process.env.TOKEN_EXPIRES
                });
                res.json({
                    access_token: token,
                });
            }
            else {
                // passwords do not match
                res.json({
                    access_token: false
                });
            }
        });
    }
});
exports.verify = (req, res) => {
    res.json({ status: true });
};
//# sourceMappingURL=authController.js.map