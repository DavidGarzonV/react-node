import bodyParser from 'body-parser';
import express from "express";
import { UserEntity } from './models/user/user.entity';
import { EmpresaEntity } from './models/empresa/empresa.entity';
import { EmpleadoEntity } from './models/empleado/empleado.entity';
import { createConnection } from "typeorm";
var cors = require('cors')

require('dotenv').config()

createConnection({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [EmpleadoEntity, EmpresaEntity, UserEntity]
}).then(async (conexion) => {
    console.log("db connected")

    //Sincronize table configuration
    await conexion.synchronize();

    const app = express();
    app.use(cors())

    // parse application/x-www-form-urlencoded
    // parse application/json
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    
    //Set routes
    app.use('/', require('./routes/index'));
    app.use('/empleados', require('./routes/empleado'));
    app.use('/empresas', require('./routes/empresa'));
    app.use('/user', require('./routes/user'));
    app.use('/auth', require('./routes/auth'));

    // start the Express server
    app.listen( process.env.PORT, () => {
        console.log( `server started at http://localhost:${ process.env.PORT }` );
    });
}).catch((err) => {
    console.log("err db connect", err)
});