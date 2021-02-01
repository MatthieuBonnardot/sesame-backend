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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const Logs_1 = __importDefault(require("../../Models/Mongoose/Logs"));
const logger = pino_1.default({
    prettyPrint: true,
});
const getLogs = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    Logs_1.default.find({}, (err, docs) => {
        if (err) {
            logger.error(`Error: ${err}`);
        }
        else if (docs.length === 0) {
            logger.info('The list of issues is empty');
            res.status(200).send('The list of issues is empty');
        }
        else {
            res.send(docs);
        }
    });
});
exports.default = getLogs;
//# sourceMappingURL=log.controller.js.map