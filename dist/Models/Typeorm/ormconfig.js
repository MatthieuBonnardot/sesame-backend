"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dbSocketAddr = '35.189.255.98:5432'.split(':');
var config = {
    type: 'postgres',
    url: 'postgres://qngwzcmp:ABXT8VBgH4hYRuyqx0VbceNPOZhclYQt@kandula.db.elephantsql.com:5432/qngwzcmp',
    entities: [
        path_1.default.join(__dirname, '/*.entity{.ts,.js}'),
    ],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map