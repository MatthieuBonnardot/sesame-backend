/* eslint-disable import/prefer-default-export */
import express from 'express';
import logController from '../Controllers/IssueAndLogs/log.controller';
import * as issueController from '../Controllers/IssueAndLogs/issue.controller';

const status = express.Router();

status.get('/logs', logController.getLogs);
status.post('/issues', issueController.createIssue);
status.get('/issues', issueController.getIssues);
status.put('/issues', issueController.toggleIssueStatus);

export default status;
