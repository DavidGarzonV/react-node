"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmpresaEntity = void 0;
const empleado_entity_1 = require("./../empleado/empleado.entity");
const typeorm_1 = require("typeorm");
let EmpresaEntity = class EmpresaEntity {
    constructor(id, name, nit, tipo, contacto) {
        this.id = id;
        this.name = name;
        this.nit = nit;
        this.tipo = tipo;
        this.contacto = contacto;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], EmpresaEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpresaEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpresaEntity.prototype, "nit", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpresaEntity.prototype, "tipo", void 0);
__decorate([
    typeorm_1.ManyToOne(() => empleado_entity_1.EmpleadoEntity),
    typeorm_1.JoinColumn(),
    __metadata("design:type", empleado_entity_1.EmpleadoEntity)
], EmpresaEntity.prototype, "contacto", void 0);
EmpresaEntity = __decorate([
    typeorm_1.Entity('empresa'),
    __metadata("design:paramtypes", [String, String, String, String, empleado_entity_1.EmpleadoEntity])
], EmpresaEntity);
exports.EmpresaEntity = EmpresaEntity;
//# sourceMappingURL=empresa.entity.js.map