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
exports.updateGroup = exports.deleteGroup = exports.getGroups = exports.createGroup = void 0;
var pino_1 = __importDefault(require("pino"));
var typeorm_1 = require("typeorm");
var Group_entity_1 = __importDefault(require("../../Models/Typeorm/Group.entity"));
var Door_entity_1 = __importDefault(require("../../Models/Typeorm/Door.entity"));
var logger = pino_1.default({
    prettyPrint: true,
});
var getGroups = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groups, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4, typeorm_1.getRepository(Group_entity_1.default).find({
                        relations: ['doors'],
                    })];
            case 1:
                groups = _a.sent();
                res.send(groups);
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
exports.getGroups = getGroups;
var updateGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var gid, _a, doors, formattedBody, groupTable, updatedGroup, doorEntity, error_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                gid = Number(req.params.id);
                _a = req.body, doors = _a.doors, formattedBody = __rest(_a, ["doors"]);
                groupTable = typeorm_1.getRepository(Group_entity_1.default);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 8, , 9]);
                if (!(Object.keys(formattedBody).length !== 0)) return [3, 3];
                return [4, groupTable.update({ gid: gid }, formattedBody)];
            case 2:
                _b.sent();
                _b.label = 3;
            case 3: return [4, groupTable.findOne(gid)];
            case 4:
                updatedGroup = _b.sent();
                if (!doors) return [3, 6];
                return [4, typeorm_1.getRepository(Door_entity_1.default).findByIds(doors)];
            case 5:
                doorEntity = _b.sent();
                updatedGroup.doors = doorEntity;
                _b.label = 6;
            case 6: return [4, groupTable.save(updatedGroup)];
            case 7:
                _b.sent();
                updatedGroup.doors = doors;
                res.send(updatedGroup);
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
exports.updateGroup = updateGroup;
var createGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groupTable, _a, doors, groupName, description, accessFromHour, accessToHour, formattedBody, newGroup, doorEntities, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                groupTable = typeorm_1.getRepository(Group_entity_1.default);
                _a = req.body, doors = _a.doors, groupName = _a.groupName, description = _a.description, accessFromHour = _a.accessFromHour, accessToHour = _a.accessToHour;
                formattedBody = {
                    groupName: groupName,
                    description: description,
                    accessFromHour: accessFromHour,
                    accessToHour: accessToHour,
                };
                _b.label = 1;
            case 1:
                _b.trys.push([1, 5, , 6]);
                newGroup = groupTable.create(formattedBody);
                if (!doors.length) return [3, 3];
                return [4, typeorm_1.getRepository(Door_entity_1.default).findByIds(doors)];
            case 2:
                doorEntities = _b.sent();
                newGroup.doors = doorEntities;
                _b.label = 3;
            case 3: return [4, groupTable.save(newGroup)];
            case 4:
                _b.sent();
                newGroup.doors = doors;
                res.send(newGroup);
                return [3, 6];
            case 5:
                error_3 = _b.sent();
                logger.error(error_3);
                res.sendStatus(500);
                return [3, 6];
            case 6: return [2];
        }
    });
}); };
exports.createGroup = createGroup;
var deleteGroup = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var groupTable, deletedGroup, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                groupTable = typeorm_1.getRepository(Group_entity_1.default);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4, groupTable.findOne(req.params.id)];
            case 2:
                deletedGroup = _a.sent();
                return [4, groupTable.delete(req.params.id)];
            case 3:
                _a.sent();
                res.send(deletedGroup);
                return [3, 5];
            case 4:
                error_4 = _a.sent();
                logger.error(error_4);
                res.sendStatus(500);
                return [3, 5];
            case 5: return [2];
        }
    });
}); };
exports.deleteGroup = deleteGroup;
//# sourceMappingURL=group.controller.js.map