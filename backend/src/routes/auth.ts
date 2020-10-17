import { checkJwt } from './../middlewares/autentication';
import express from "express";
var router = express.Router();
import * as authController from '../controllers/authController';

router.post('/login', authController.login);
router.post('/verify',[checkJwt], authController.verify);

module.exports = router;
