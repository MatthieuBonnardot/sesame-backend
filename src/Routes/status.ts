/* eslint-disable import/prefer-default-export */
import express from 'express';
import logController from '../Controllers/IssueAndLogs/log.controller';
import * as issueController from '../Controllers/IssueAndLogs/issue.controller';

const status = express.Router();

status.get('/logs', logController.getLogs);
status.post('/logs', logController.createLog);
status.get('/logs/:id', logController.findLogsById);
status.post('/issues', issueController.createIssue);
status.get('/issues', issueController.getIssues);
status.put('/issues/:id', issueController.toggleIssueStatus);
status.delete('/issues/:id', issueController.deleteIssue);

export default status;
