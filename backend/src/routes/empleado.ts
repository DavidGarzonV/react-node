import { checkJwt } from './../middlewares/autentication';
import express from "express";

var router = express.Router();

import * as empleadoController from '../controllers/empleadoController';

// router.get('/', [checkJwt], empleadoController.getAllEmpleados);
router.get('/', [checkJwt], empleadoController.getAllEmpleados);
router.get('/:id', [checkJwt], empleadoController.getEmpleadoById);
router.post('/', [checkJwt], empleadoController.newEmpleado);
router.put('/:id', [checkJwt], empleadoController.updateEmpleado);
router.delete('/:id', [checkJwt], empleadoController.deleteEmpleado);


module.exports = router;
