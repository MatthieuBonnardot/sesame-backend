/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
import { Request, Response } from 'express';
import Issues from '../../Models/Mongoose/Issues';

const createIssue = async (req: Request, res: Response) => {
  try {
    const createIssue = new Issues(req.body);
    createIssue.save().then((savedIssue) => {
      res.status(200).send(savedIssue);
    });
  } catch (error) {
    res.sendStatus(500);
  }
};

const getIssues = async (_: any, res: Response) => {
  try {
    Issues.find().then((issues) => res.send(issues));
  } catch (error) {
    res.status(500).json({ error: 'an error occurred' });
  }
};

const toggleIssueStatus = async (req: Request, res: Response) => {
  try {
    await Issues.findOneAndUpdate(
      { _id: req.params.id },
      { active: false },
      { new: true },
    ).then((updatedIssue) => res.send(updatedIssue));
  } catch (error) {
    res.sendStatus(500);
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  Issues.findByIdAndDelete(req.params.id).then((successResponse) => {
    if (successResponse) res.send(`${req.params.id} has successfully been deleted`);
    else res.sendStatus(404);
  });
};

export {
  createIssue, getIssues, toggleIssueStatus, deleteIssue,
};
