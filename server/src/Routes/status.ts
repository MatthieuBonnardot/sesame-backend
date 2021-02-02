/* eslint-disable import/prefer-default-export */
import express from 'express';
import logController from '../Controllers/IssueAndLogs/log.controller';
import * as issueController from '../Controllers/IssueAndLogs/issue.controller';

const router = express.Router();

router.get('/logs', logController.getLogs);
router.get('/issues', issueController.getIssues);
router.put('/issues', issueController.toggleIssueStatus);

export { router };
