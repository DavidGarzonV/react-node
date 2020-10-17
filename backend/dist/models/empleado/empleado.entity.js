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
exports.EmpleadoEntity = void 0;
const empresa_entity_1 = require("./../empresa/empresa.entity");
const typeorm_1 = require("typeorm");
let EmpleadoEntity = class EmpleadoEntity {
    // @Column()
    // readonly company: string;
    constructor(id, name, last_name, phone, email, company) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], EmpleadoEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpleadoEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpleadoEntity.prototype, "last_name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpleadoEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], EmpleadoEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToOne(type => empresa_entity_1.EmpresaEntity, { nullable: true }),
    typeorm_1.JoinColumn(),
    __metadata("design:type", empresa_entity_1.EmpresaEntity)
], EmpleadoEntity.prototype, "company", void 0);
EmpleadoEntity = __decorate([
    typeorm_1.Entity('empleado'),
    __metadata("design:paramtypes", [String, String, String, String, String, empresa_entity_1.EmpresaEntity])
], EmpleadoEntity);
exports.EmpleadoEntity = EmpleadoEntity;
//# sourceMappingURL=empleado.entity.js.map