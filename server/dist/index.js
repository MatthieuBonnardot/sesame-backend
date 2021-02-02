"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const pino_1 = __importDefault(require("pino"));
const ormconfig_1 = __importDefault(require("./Models/Typeorm/ormconfig"));
const connection_1 = __importDefault(require("./Databases/Mongo/connection"));
dotenv.config();
const logger = pino_1.default({
    prettyPrint: true,
});
const app = express_1.default();
const port = process.env.PORT || 4001;
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default;
        yield typeorm_1.createConnection(ormconfig_1.default);
        logger.info('Connected to Mongo DB');
        logger.info('Connected to typeOrm');
        logger.info(`Listening at http://localhost:${port}/`);
    }
    catch (e) {
        console.log(e);
    }
}));
//# sourceMappingURL=index.js.map