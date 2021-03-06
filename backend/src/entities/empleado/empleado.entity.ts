import { EmpresaEntity } from './../empresa/empresa.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('empleado')
export class EmpleadoEntity {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    readonly name: string;

    @Column()
    readonly last_name: string;

    @Column()
    readonly phone: string;

    @Column()
    readonly email: string;

    @ManyToOne(() => EmpresaEntity)
    @JoinColumn()
    company: EmpresaEntity | null;

    constructor(id: string, name: string, last_name: string, phone: string, email: string, company: EmpresaEntity) {
        this.id = id;
        this.name = name;
        this.last_name = last_name;
        this.phone = phone;
        this.email = email;
        this.company = company;
    }
}
