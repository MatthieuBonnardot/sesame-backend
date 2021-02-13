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
exports.identifyUserWithCode = exports.identifyUser = exports.addFaceMappings = exports.verifyUserStatus = void 0;
var pino_1 = __importDefault(require("pino"));
var typeorm_1 = require("typeorm");
var User_entity_1 = __importDefault(require("../../Models/Typeorm/User.entity"));
var log_controller_1 = __importDefault(require("../IssueAndLogs/log.controller"));
var checkAccess_1 = __importDefault(require("../../Middleware/checkAccess"));
var azure_method_1 = __importDefault(require("../../Recognition/azure.method"));
var logger = pino_1.default({
    prettyPrint: true,
});
var verifyUserStatus = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var list, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, typeorm_1.getRepository(User_entity_1.default).find({
                        where: { registrationKey: req.params.code },
                    })];
            case 1:
                list = _a.sent();
                if (list.length === 0)
                    res.status(404).send('Not Found');
                else if (list[0].isActive === true)
                    res.status(200).send(false);
                else if (list[0].isActive === false) {
                    res.send({
                        aid: list[0].aid,
                        firstName: list[0].firstName,
                    });
                }
                return [3, 3];
            case 2:
                error_1 = _a.sent();
                res.sendStatus(500);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
exports.verifyUserStatus = verifyUserStatus;
var addFaceMappings = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4, typeorm_1.getRepository(User_entity_1.default).findOne(req.params.UID)];
            case 1:
                user = _a.sent();
                return [4, azure_method_1.default('USER', 'FACE', {
                        personId: req.params.UID,
                        octetStream: req.body,
                    })];
            case 2:
                response = _a.sent();
                if (!(user && response)) return [3, 4];
                return [4, typeorm_1.getRepository(User_entity_1.default).update(req.params.UID, { isActive: true })];
            case 3:
                _a.sent();
                res.send({
                    message: response,
                    doorkey: user.doorKey,
                });
                _a.label = 4;
            case 4: return [3, 6];
            case 5:
                error_2 = _a.sent();
                res.sendStatus(500);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.addFaceMappings = addFaceMappings;
var identifyUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, faceID, DID, azureResponse, personId, checked, error_3;
    var _b, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 5, , 6]);
                _a = req.params, faceID = _a.faceID, DID = _a.DID;
                return [4, azure_method_1.default('IDENTIFY', '', {
                        personId: faceID,
                    })];
            case 1:
                azureResponse = _d.sent();
                if (!!((_c = (_b = azureResponse[0]) === null || _b === void 0 ? void 0 : _b.candidates[0]) === null || _c === void 0 ? void 0 : _c.personId)) return [3, 2];
                res.send({
                    arg: 'User is unknown',
                });
                return [3, 4];
            case 2:
                personId = azureResponse[0].candidates[0].personId;
                return [4, checkAccess_1.default(personId, Number(DID))];
            case 3:
                checked = _d.sent();
                if (checked.access) {
                    log_controller_1.default.internalLogCreation({
                        enteredBy: personId,
                        enteredDoor: DID,
                    });
                }
                res.send(checked);
                _d.label = 4;
            case 4: return [3, 6];
            case 5:
                error_3 = _d.sent();
                logger.error(error_3);
                res.sendStatus(500);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.identifyUser = identifyUser;
var identifyUserWithCode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, checked, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4, typeorm_1.getRepository(User_entity_1.default).find({
                        where: { doorKey: req.params.code },
                    })];
            case 1:
                user = _a.sent();
                if (user.length <= 0) {
                    res.send({
                        arg: 'User is unknown',
                    });
                }
                return [4, checkAccess_1.default(user[0].aid, Number(req.params.DID))];
            case 2:
                checked = _a.sent();
                if (checked.access) {
                    log_controller_1.default.internalLogCreation({
                        enteredBy: user[0].aid,
                        enteredDoor: req.params.DID,
                    });
                }
                res.send(checked);
                return [3, 4];
            case 3:
                error_4 = _a.sent();
                res.sendStatus(500);
                return [3, 4];
            case 4: return [2];
        }
    });
}); };
exports.identifyUserWithCode = identifyUserWithCode;
//# sourceMappingURL=user.recognition.js.map