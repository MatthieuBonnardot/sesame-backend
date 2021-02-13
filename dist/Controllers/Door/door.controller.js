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
exports.openDoor = exports.deleteDoor = exports.createDoor = exports.updateDoor = exports.getDoors = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var pino_1 = __importDefault(require("pino"));
var typeorm_1 = require("typeorm");
var Door_entity_1 = __importDefault(require("../../Models/Typeorm/Door.entity"));
var logger = pino_1.default({
    prettyPrint: true,
});
var getDoors = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var doors, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, typeorm_1.getRepository(Door_entity_1.default).find({
                        relations: ['groups'],
                    })];
            case 1:
                doors = _a.sent();
                res.send(doors);
                return [3, 3];
            case 2:
                error_1 = _a.sent();
                logger.error(error_1);
                res.sendStatus(500);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.getDoors = getDoors;
var updateDoor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var did, newDoor, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                did = Number(req.params.id);
                return [4, typeorm_1.getRepository(Door_entity_1.default).update({ did: did }, req.body)];
            case 1:
                _a.sent();
                return [4, typeorm_1.getRepository(Door_entity_1.default).findOne(did, {
                        relations: ['groups'],
                    })];
            case 2:
                newDoor = _a.sent();
                res.send(newDoor);
                return [3, 4];
            case 3:
                error_2 = _a.sent();
                logger.error(error_2);
                res.sendStatus(500);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.updateDoor = updateDoor;
var createDoor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newDoor, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, typeorm_1.getRepository(Door_entity_1.default).create(req.body)];
            case 1:
                newDoor = _a.sent();
                return [4, typeorm_1.getRepository(Door_entity_1.default).save(newDoor)];
            case 2:
                _a.sent();
                res.send(newDoor);
                return [3, 4];
            case 3:
                error_3 = _a.sent();
                logger.error(error_3);
                res.sendStatus(500);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.createDoor = createDoor;
var deleteDoor = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var deletedDoor, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                deletedDoor = typeorm_1.getRepository(Door_entity_1.default).findOne(req.params.id, {
                    relations: ['groups'],
                });
                return [4, typeorm_1.getRepository(Door_entity_1.default).delete(req.params.id)];
            case 1:
                _a.sent();
                res.send(deletedDoor);
                return [3, 3];
            case 2:
                error_4 = _a.sent();
                logger.error(error_4);
                res.status(500);
                res.send(error_4);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.deleteDoor = deleteDoor;
var openDoor = function (code) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            node_fetch_1.default('https://door.codeworks.me/api/key/open', {
                method: 'POST',
                headers: {
                    code: "" + code,
                },
            });
        }
        catch (error) {
            logger.error(error);
        }
        return [2];
    });
}); };
exports.openDoor = openDoor;
//# sourceMappingURL=door.controller.js.map