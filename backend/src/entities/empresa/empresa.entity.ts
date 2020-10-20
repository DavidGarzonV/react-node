import { EmpleadoEntity } from './../empleado/empleado.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('empresa')
export class EmpresaEntity {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    readonly name: string;

    @Column()
    readonly nit: string;

    @Column()
    readonly tipo: string;

    @ManyToOne(() => EmpleadoEntity)
    @JoinColumn()
    contacto: EmpleadoEntity | null;

    constructor(id: string, name: string, nit: string, tipo: string, contacto: EmpleadoEntity) {
        this.id = id;
        this.name = name;
        this.nit = nit;
        this.tipo = tipo;
        this.contacto = contacto;
    }
}
