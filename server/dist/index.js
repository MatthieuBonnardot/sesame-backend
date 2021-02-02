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
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const pino_1 = __importDefault(require("pino"));
const dotenv = __importStar(require("dotenv"));
const connection_1 = __importDefault(require("./Databases/Mongo/connection"));
dotenv.config();
const logger = pino_1.default({
    prettyPrint: true,
});
const port = process.env.PORT || 4001;
const router = express_1.default();
router.use((req, res, next) => {
    logger.info(`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`);
    res.on('finish', () => {
        logger.info(`METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS - [${req.statusCode}]`);
    });
    next();
});
router.use(body_parser_1.default.urlencoded({ extended: false }));
router.use(body_parser_1.default.json());
router.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST PUT DELETE');
        return res.status(200).json({});
    }
    next();
});
router.use((req, res) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message,
    });
});
const httpServer = http_1.default.createServer(router);
httpServer.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connection_1.default;
        logger.info('Connected to Mongo DB');
        logger.info('Connected to typeOrm');
        logger.info(`Listening at http://localhost:${port}/`);
    }
    catch (error) {
        logger.error(error.message);
    }
}));
//# sourceMappingURL=index.js.map