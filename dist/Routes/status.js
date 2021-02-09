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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var log_controller_1 = __importDefault(require("../Controllers/IssueAndLogs/log.controller"));
var issueController = __importStar(require("../Controllers/IssueAndLogs/issue.controller"));
var status = express_1.default.Router();
status.get('/logs', log_controller_1.default.getLogs);
status.post('/logs', log_controller_1.default.createLog);
status.get('/logs/:id', log_controller_1.default.findLogsById);
status.post('/issues', issueController.createIssue);
status.get('/issues', issueController.getIssues);
status.put('/issues/:id', issueController.toggleIssueStatus);
status.delete('/issues/:id', issueController.deleteIssue);
exports.default = status;
//# sourceMappingURL=status.js.map