"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Logs = mongoose_1.model('logs', new mongoose_1.Schema({
    enteredBy: { type: Number, required: true },
    enteredDoor: { type: Number, required: true },
    date: { type: Date, required: true },
}));
module.exports = Logs;
//# sourceMappingURL=Logs.js.map