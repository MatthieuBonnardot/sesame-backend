import {
  model, Schema, Model, Document,
} from 'mongoose';

interface Log extends Document {
  enteredBy: Number;
  enteredDoor: Number;
  date: Date;
}

const LogsSchema: Schema = new Schema({
  enteredBy: { type: Number, required: true },
  enteredDoor: { type: Number, required: true },
  date: { type: Date, required: true },
});

const Logs: Model<Log> = model('logs', LogsSchema);

module.exports = Logs;
