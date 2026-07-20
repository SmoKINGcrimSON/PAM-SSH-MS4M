import { DataSource } from "typeorm/browser/data-source/index.js";
import { Server } from "./server.entity";


export const serverProviders = [
    {
        provide: 'SERVER_REPOSITORY',
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Server),
        inject: ['DATA_SOURCE'],
    },
];