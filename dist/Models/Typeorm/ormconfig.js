"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: 'postgres',
    password: 'password',
    database: process.env.POSTGRES_DB,
    entities: [
        path_1.default.join(__dirname, '/*.entity{.ts,.js}'),
    ],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map