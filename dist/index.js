"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var pino_1 = __importDefault(require("pino"));
var typeorm_1 = require("typeorm");
var cors_1 = __importDefault(require("cors"));
var config_1 = __importDefault(require("./config/config"));
require("reflect-metadata");
var router_1 = __importDefault(require("./Routes/router"));
var ormconfig_1 = __importDefault(require("./Models/Typeorm/ormconfig"));
var connection_1 = __importDefault(require("./Databases/Mongo/connection"));
var azure_method_1 = __importDefault(require("./Recognition/azure.method"));
var logger = pino_1.default({
    prettyPrint: true,
});
var app = express_1.default();
app.use(cors_1.default());
app.use(function (req, res, next) {
    logger.info("[" + req.method + "] [" + req.url + "] [" + req.hostname + "]");
    res.on('finish', function () {
        logger.info("[" + req.method + "] [" + req.url + "] [" + req.hostname + "] ==> [" + res.statusCode + "]");
    });
    next();
});
app.use(body_parser_1.default.json());
app.use(function (req, res, next) {
    if (req.url.match(/azure\/register/) && req.method === 'PUT') {
        var body_1 = [];
        req
            .on('data', function (chunk) { return body_1.push(chunk); })
            .on('end', function () {
            req.body = Buffer.concat(body_1);
            console.log(req.body);
            next();
        });
    }
    else
        next();
});
app.use(function (req, res, next) {
    res.header('Acces-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET POST PUT DELETE');
        return res.status(200).json({});
    }
    next();
});
app.use(router_1.default);
app.use(function (req, res) {
    var error = new Error('not found');
    return res.status(404).json({
        message: error.message,
    });
});
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4, connection_1.default()];
            case 1:
                _a.sent();
                return [4, typeorm_1.createConnection(ormconfig_1.default)];
            case 2:
                _a.sent();
                logger.info('Connected to SQL DB');
                return [4, azure_method_1.default('GROUP', 'TRAIN', {})];
            case 3:
                _a.sent();
                return [4, azure_method_1.default('GROUP', 'STATUS', {})];
            case 4:
                _a.sent();
                app.listen(config_1.default.server.port, function () { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        logger.info("Listening at http://" + config_1.default.server.hostname + ":" + config_1.default.server.port + "/");
                        return [2];
                    });
                }); });
                return [3, 6];
            case 5:
                error_1 = _a.sent();
                logger.error(error_1.message);
                return [3, 6];
            case 6: return [2];
        }
    });
}); })();
//# sourceMappingURL=index.js.map