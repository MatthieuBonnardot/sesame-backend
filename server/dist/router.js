"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const door_controller_1 = __importDefault(require("./Controllers/Door/door.controller"));
const group_controller_1 = __importDefault(require("./Controllers/Group/group.controller"));
const issue_controller_1 = __importDefault(require("./Controllers/IssueAndLogs/issue.controller"));
const log_controller_1 = __importDefault(require("./Controllers/IssueAndLogs/log.controller"));
const user_controller_1 = __importDefault(require("./Controllers/User/user.controller"));
const router = express_1.Router();
router.get('/api/user', user_controller_1.default.getUsers);
router.put('/api/user', user_controller_1.default.updatedUser);
router.delete('/api/user', user_controller_1.default.deleteUser);
router.post('/api/user', user_controller_1.default.createUser);
router.get('/api/door', door_controller_1.default.getDoors);
router.post('/api/door', door_controller_1.default.createDoor);
router.delete('/api/door', door_controller_1.default.deleteDoor);
router.get('/api/logs', log_controller_1.default.getLogs);
router.get('/api/issues', issue_controller_1.default.getIssues);
router.put('/api/issue', issue_controller_1.default.toggleIssueStatus);
router.get('/api/groups', group_controller_1.default.getGroups);
router.post('/api/group', group_controller_1.default.createGroup);
router.delete('/api/group', group_controller_1.default.deleteGroup);
router.put('/api/group', group_controller_1.default.updateGroup);
exports.default = router;
//# sourceMappingURL=router.js.map