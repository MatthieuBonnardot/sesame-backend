/* eslint-disable import/no-extraneous-dependencies */
import pino from "pino";
import { Request, Response } from "express";
import Issues from "../../Models/Mongoose/Issues";

const logger = pino({
  prettyPrint: true,
});

const createIssue = (req: Request, res: Response) => {
  Issues.create([req.body]).then((docs, err) => {
    if (err) res.status(err.status).send(err.message);
    console.log(docs);
    res.status(200).send(docs);
  });
};

const getIssues = async (_: any, res: Response) => {
  try {
    logger.info("entered: GetIssues");
    const response = await Issues.find();
    if (response) res.status(200).send(response);
    else res.status(200).send("No issues found!");
  } catch (error) {
    res.status(501).send(error.message);
  }
};

const toggleIssueStatus = async (req: Request, res: Response) => {};

export { createIssue, getIssues, toggleIssueStatus };
