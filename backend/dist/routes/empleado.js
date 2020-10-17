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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const autentication_1 = require("./../middlewares/autentication");
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
const empleadoController = __importStar(require("../controllers/empleadoController"));
// router.get('/', [checkJwt], empleadoController.getAllEmpleados);
router.get('/', [autentication_1.checkJwt], empleadoController.getAllEmpleados);
router.get('/:id', [autentication_1.checkJwt], empleadoController.getEmpleadoById);
router.post('/', [autentication_1.checkJwt], empleadoController.newEmpleado);
router.put('/:id', [autentication_1.checkJwt], empleadoController.updateEmpleado);
router.delete('/:id', [autentication_1.checkJwt], empleadoController.deleteEmpleado);
module.exports = router;
//# sourceMappingURL=empleado.js.map