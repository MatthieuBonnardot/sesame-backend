import { Router } from 'express';
import Door from './Controllers/Door/door.controller';
import Group from './Controllers/Group/group.controller';
import Issue from './Controllers/IssueAndLogs/issue.controller';
import Log from './Controllers/IssueAndLogs/log.controller';
import User from './Controllers/User/user.controller';
const router: Router = Router();

//Native endpoints
// router.get('/api/user/:code');
// router.put('/api/user/images/:UID');
// router.get('/api/user/identify/:faceID');

router.get('/api/user', User.getUsers);
router.put('/api/user', User.updatedUser);
router.delete('/api/user', User.deleteUser);
router.post('/api/user', User.createUser);

router.get('/api/door', Door.getDoors);
router.post('/api/door', Door.createDoor);
router.delete('/api/door', Door.deleteDoor);

router.get('/api/logs', Log.getLogs);
router.get('/api/issues', Issue.getIssues);
router.put('/api/issue', Issue.toggleIssueStatus);

router.get('/api/groups', Group.getGroups);
router.post('/api/group', Group.createGroup);
router.delete('/api/group', Group.deleteGroup);
router.put('/api/group', Group.updateGroup);

export default router;
