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
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const typeorm_1 = require("typeorm");
var cors = require('cors');
require('dotenv').config();
typeorm_1.createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [__dirname + '/entities/**/*.ts']
}).then((conexion) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("db connected");
    //Sincronize table configuration
    yield conexion.synchronize();
    const app = express_1.default();
    app.use(cors());
    // parse application/x-www-form-urlencoded
    // parse application/json
    app.use(body_parser_1.default.json());
    app.use(body_parser_1.default.urlencoded({ extended: false }));
    //Set routes
    app.use('/', require('./routes/index'));
    app.use('/empleados', require('./routes/empleado'));
    app.use('/empresas', require('./routes/empresa'));
    app.use('/user', require('./routes/user'));
    app.use('/auth', require('./routes/auth'));
    // start the Express server
    app.listen(process.env.PORT, () => {
        console.log(`server started at http://localhost:${process.env.PORT}`);
    });
})).catch((err) => {
    console.log("err db connect", err);
});
//# sourceMappingURL=server.js.map