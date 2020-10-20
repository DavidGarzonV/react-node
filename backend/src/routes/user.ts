import express from "express";
var router = express.Router();
import * as userController from '../controllers/user/userController';
import { checkJwt } from './../middlewares/autentication';


router.get('/', userController.getAllUsers);
router.get('/:id', [checkJwt], userController.getUserById);
router.post('/', userController.newUser);
router.put('/:id', [checkJwt], userController.updateUser);
router.delete('/:id', [checkJwt], userController.deleteUser);

module.exports = router;
