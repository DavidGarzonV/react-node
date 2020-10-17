"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const empleado_entity_1 = require("../../models/empleado/empleado.entity");
const typeorm_1 = require("typeorm");
typeorm_1.createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [empleado_entity_1.EmpleadoEntity]
}).then((conexion) => {
    console.log("db connected");
}).catch((err) => {
    console.log("err db connect");
});
//# sourceMappingURL=config.js.map