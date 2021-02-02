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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const door_controller_1 = require("./Controllers/Door/door.controller");
const Group = __importStar(require("./Controllers/Group/group.controller"));
const Issue = __importStar(require("./Controllers/IssueAndLogs/issue.controller"));
const Log = __importStar(require("./Controllers/IssueAndLogs/log.controller"));
const User = __importStar(require("./Controllers/User/user.controller"));
const router = express_1.Router();
router.get('/api/user', User.getUsers);
router.put('/api/user', User.updatedUser);
router.delete('/api/user', User.deleteUser);
router.post('/api/user', User.createUser);
router.get('/api/door', door_controller_1.getDoors);
router.post('/api/door', door_controller_1.createDoor);
router.delete('/api/door', door_controller_1.deleteDoor);
router.get('/api/logs', Log.getLogs);
router.get('/api/issues', Issue.getIssues);
router.put('/api/issue', Issue.toggleIssueStatus);
router.get('/api/groups', Group.getGroups);
router.post('/api/group', Group.createGroup);
router.delete('/api/group', Group.deleteGroup);
router.put('/api/group', Group.updateGroup);
exports.default = router;
//# sourceMappingURL=router.js.map