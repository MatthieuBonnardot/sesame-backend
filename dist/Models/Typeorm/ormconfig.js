"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var config_1 = __importDefault(require("../../config/config"));
var config = {
    type: 'postgres',
    url: config_1.default.postgres.uri,
    entities: [
        path_1.default.join(__dirname, '/*.entity{.ts,.js}'),
    ],
    synchronize: true,
    logging: false,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map