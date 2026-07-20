import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Server{

    @PrimaryGeneratedColumn()
    server_id!: number;

    @Column()
    hostname!: string;

    @Column()
    ip_address!: string;

    @Column()
    ssh_port!: number;

    @Column()
    mine_name!: string;

    constructor(server: Partial<Server>){
        Object.assign(this, server)
    }
}