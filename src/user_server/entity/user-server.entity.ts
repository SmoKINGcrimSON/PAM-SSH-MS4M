import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserServer{
    @PrimaryGeneratedColumn()
    user_server_id!: number;

    @Column()
    user_id!: number;

    @Column()
    server_id!: number;

    @Column()
    ssh_username!: string;

    @Column()
    encrypted_password!: string;
}