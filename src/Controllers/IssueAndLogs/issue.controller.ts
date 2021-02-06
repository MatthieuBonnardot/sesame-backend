/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import pino from 'pino';
import { Request, Response } from 'express';
import { send } from 'process';
import Issues from '../../Models/Mongoose/Issues';

const logger = pino({
  prettyPrint: true,
});

const createIssue = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const issueData: typeof Issues = req.body;
    const createIssue = new Issues(issueData);
    createIssue.save().then((savedIssue) => {
      res.status(200).send(savedIssue);
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'an error occurred', errorMessage: error.message });
  }
};

const getIssues = async (_: any, res: Response) => {
  try {
    Issues.find().then((issues) => {
      res.status(200).send(issues);
    });
  } catch (error) {
    res.status(500).json({ error: 'an error occurred' });
  }
};

const toggleIssueStatus = async (req: Request, res: Response) => {
  try {
    const filter = { _id: req.params.id };
    const update = { active: false };
    const opts = { new: true };
    const doc = await Issues.findOneAndUpdate(filter, update, opts);
    res.status(200).send(doc);
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  const { id } = req.params;
  Issues.findByIdAndDelete(id).then((successResponse) => {
    if (successResponse) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });
};

export {
  createIssue, getIssues, toggleIssueStatus, deleteIssue,
};
