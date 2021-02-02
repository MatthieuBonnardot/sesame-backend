import {
  model, Schema, Model, Document,
} from 'mongoose';

interface Issue extends Document {
  type: String;
  active: Boolean;
  reportedBy: Number;
  createdOn: Date;
}

const Issues: Model<Issue> = model(
  'Issue',
  new Schema({
    type: { type: String, required: true },
    active: { type: Number, required: true, default: true },
    reportedBy: { type: Number, required: true },
    createdOn: { type: String, required: false, default: JSON.stringify(new Date().getTime) },
  }),
);

export default Issues;
