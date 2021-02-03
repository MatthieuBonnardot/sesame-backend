import {
  model, Schema, Document,
} from 'mongoose';

interface Log {
  enteredBy: Number;
  enteredDoor: Number;
  date: Date;
}

const logSchema = new Schema({
  enteredBy: { type: Number, required: true },
  enteredDoor: { type: Number, required: true },
  date: { type: String, required: false, default: JSON.stringify(new Date().getTime) },
});

const logModel = model<Log & Document>('Logs', logSchema);

export default logModel;
