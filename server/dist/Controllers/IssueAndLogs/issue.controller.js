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
exports.toggleIssueStatus = exports.getIssues = void 0;
const pino_1 = __importDefault(require("pino"));
const Issues_1 = __importDefault(require("../../Models/Mongoose/Issues"));
const logger = pino_1.default({
    prettyPrint: true,
});
const getIssues = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    Issues_1.default.find({}, (err, docs) => {
        if (err) {
            logger.error(`Error: ${err}`);
        }
        else if (docs.length === 0) {
            logger.info('Empty list of issues');
        }
        else {
            res.send(docs);
        }
    });
});
exports.getIssues = getIssues;
const toggleIssueStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
});
exports.toggleIssueStatus = toggleIssueStatus;
//# sourceMappingURL=issue.controller.js.map