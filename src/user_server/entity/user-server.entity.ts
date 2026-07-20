import { Server } from "src/server/entity/server.entity";
import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UserServer{
    @PrimaryGeneratedColumn()
    user_server_id!: number;

    @ManyToOne(() => User, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id',})
    user!: User;

    @ManyToOne(() => Server, {nullable: false, onDelete: 'CASCADE'})
    @JoinColumn({name: 'server_id',})
    server!: Server;

    @Column()
    ssh_username!: string;

    @Column()
    encrypted_password!: string;

    constructor(userServer: Partial<UserServer>){
        Object.assign(this, userServer)
    }
}