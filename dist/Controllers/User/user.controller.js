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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.deleteUser = exports.createUser = exports.getUsers = void 0;
var typeorm_1 = require("typeorm");
var pino_1 = __importDefault(require("pino"));
var User_entity_1 = __importDefault(require("../../Models/Typeorm/User.entity"));
var Group_entity_1 = __importDefault(require("../../Models/Typeorm/Group.entity"));
var azure_method_1 = __importDefault(require("../../Recognition/azure.method"));
var sendActivationEmail_1 = __importDefault(require("../../Authentication/ActivationEmail/sendActivationEmail"));
var logger = pino_1.default({
    prettyPrint: true,
});
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, typeorm_1.getRepository(User_entity_1.default).find({
                        relations: ['group'],
                    })];
            case 1:
                users = _a.sent();
                res.send(users);
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
exports.getUsers = getUsers;
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userTable, _a, group, formattedBody, personId, newUser, groupEntity, userEntity, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userTable = typeorm_1.getRepository(User_entity_1.default);
                _a = req.body, group = _a.group, formattedBody = __rest(_a, ["group"]);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                return [4, azure_method_1.default('USER', 'CREATE', {
                        email: formattedBody.email,
                    })];
            case 2:
                personId = (_b.sent()).personId;
                formattedBody.aid = personId;
                newUser = userTable.create(formattedBody);
                return [4, userTable.save(newUser)];
            case 3:
                _b.sent();
                if (!group) return [3, 7];
                return [4, typeorm_1.getRepository(Group_entity_1.default).findOne(group)];
            case 4:
                groupEntity = _b.sent();
                return [4, userTable.findOne(personId)];
            case 5:
                userEntity = _b.sent();
                userEntity.group = groupEntity;
                return [4, userTable.save(userEntity)];
            case 6:
                _b.sent();
                _b.label = 7;
            case 7:
                sendActivationEmail_1.default(newUser);
                res.send(newUser);
                return [3, 9];
            case 8:
                error_2 = _b.sent();
                logger.error(error_2);
                res.sendStatus(500);
                return [3, 9];
            case 9: return [2];
        }
    });
}); };
exports.createUser = createUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var aid, _a, group, formattedBody, userTable, updatedUser, groupEntity, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                aid = req.params.id;
                _a = req.body, group = _a.group, formattedBody = __rest(_a, ["group"]);
                userTable = typeorm_1.getRepository(User_entity_1.default);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 7, , 8]);
                if (!Object.keys(formattedBody).length) return [3, 3];
                return [4, userTable.update({ aid: aid }, formattedBody)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4, userTable.findOne({ where: { aid: aid } })];
            case 4:
                updatedUser = _b.sent();
                if (!group) return [3, 6];
                return [4, typeorm_1.getRepository(Group_entity_1.default).findOne(group)];
            case 5:
                groupEntity = _b.sent();
                updatedUser.group = groupEntity;
                _b.label = 6;
            case 6:
                userTable.save(updatedUser);
                res.send(updatedUser);
                return [3, 8];
            case 7:
                error_3 = _b.sent();
                logger.error(error_3);
                res.sendStatus(500);
                return [3, 8];
            case 8: return [2];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userTable, deletedUser, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userTable = typeorm_1.getRepository(User_entity_1.default);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                return [4, userTable.findOne(req.params.id)];
            case 2:
                deletedUser = _a.sent();
                return [4, userTable.delete(req.params.id)];
            case 3:
                _a.sent();
                return [4, azure_method_1.default('USER', 'DELETE', { personId: req.params.id })];
            case 4:
                _a.sent();
                res.send(deletedUser);
                return [3, 6];
            case 5:
                error_4 = _a.sent();
                logger.error(error_4);
                res.sendStatus(500);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.deleteUser = deleteUser;
//# sourceMappingURL=user.controller.js.map