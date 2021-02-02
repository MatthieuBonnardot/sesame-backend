"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config = {
    type: 'postgres',
    host: '35.189.255.98',
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