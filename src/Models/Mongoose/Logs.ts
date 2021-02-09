import {
  model, Schema, Document,
} from 'mongoose';

interface Log {
  enteredBy: String;
  enteredDoor: Number;
  date: Date;
}

const logSchema = new Schema({
  enteredBy: { type: String, required: true },
  enteredDoor: { type: Number, required: true },
  date: { type: String, required: false, default: new Date() },
});

const logModel = model<Log & Document>('Logs', logSchema);

export default logModel;
