import {
  model, Schema, Document,
} from 'mongoose';

interface Issue {
  type: String;
  active: Boolean;
  reportedBy: String ;
  createdOn: Date;
}

const issueSchema = new Schema({
  type: { type: String, required: true },
  active: { type: Number, required: true, default: true },
  reportedBy: { type: String, required: true },
  createdOn: { type: String, required: false, default: new Date() },
});

const issuesModel = model< Issue & Document>('Issue', issueSchema);

export default issuesModel;
