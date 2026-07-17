import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    username: string;

    @Column()
    user_type: string;

    constructor(user: Partial<User>){
        Object.assign(this, user)
    }
}