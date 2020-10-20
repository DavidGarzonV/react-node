import express from "express";
var router = express.Router();
import * as empresaController from '../controllers/empresa/empresaController';
import { checkJwt } from './../middlewares/autentication';

router.get('/', [checkJwt], empresaController.getAllEmpresas);
router.get('/:id', [checkJwt], empresaController.getEmpresaById);
router.post('/', [checkJwt], empresaController.newEmpresa);
router.put('/:id', [checkJwt], empresaController.updateEmpresa);
router.delete('/:id', [checkJwt], empresaController.deleteEmpresa);

module.exports = router;
