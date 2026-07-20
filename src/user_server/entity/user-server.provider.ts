import { DataSource } from "typeorm";
import { UserServer } from "./user-server.entity";

export const userServerProviders = [
    {
        provide: 'USER_SERVER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(UserServer),
        inject: ['DATA_SOURCE'],
    },
];