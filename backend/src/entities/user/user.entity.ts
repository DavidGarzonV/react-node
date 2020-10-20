import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class UserEntity {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string;

    @Column()
    readonly name: string;

    @Column({ unique: true })
    readonly user: string;

    @Column()
    readonly pass: string;

    constructor(id: string, name: string, user: string, pass: string) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.pass = pass;
    }

}