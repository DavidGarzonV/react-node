import { EmpleadoEntity } from './../empleado/empleado.entity';
import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToOne(type => EmpleadoEntity, { nullable: true })
    @Index({ unique: false })
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
