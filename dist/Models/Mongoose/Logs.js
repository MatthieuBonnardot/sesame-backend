"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var Logs = mongoose_1.model('logs', new mongoose_1.Schema({
    enteredBy: { type: Number, required: true },
    enteredDoor: { type: Number, required: true },
    date: { type: Date, required: true },
}));
exports.default = Logs;
//# sourceMappingURL=Logs.js.map