import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id!: number;

    @Column({ unique: true })
    username!: string;

    @Column()
    user_type!: string;

    @Column()
    hash_password!: string; //superuser, admin, user

    constructor(user: Partial<User>){
        Object.assign(this, user)
    }
}