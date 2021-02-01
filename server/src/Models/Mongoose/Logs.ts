import {
  model, Schema, Model, Document,
} from 'mongoose';

interface Log extends Document {
  enteredBy: Number;
  enteredDoor: Number;
  date: Date;
}

const Logs: Model<Log> = model(
  'logs',
  new Schema({
    enteredBy: { type: Number, required: true },
    enteredDoor: { type: Number, required: true },
    date: { type: Date, required: true },
  }),
);

export default Logs;
