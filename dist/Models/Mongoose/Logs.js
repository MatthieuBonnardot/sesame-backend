"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var logSchema = new mongoose_1.Schema({
    enteredBy: { type: String, required: true },
    enteredDoor: { type: Number, required: true },
    date: { type: String, required: false, default: new Date() },
});
var logModel = mongoose_1.model('Logs', logSchema);
exports.default = logModel;
//# sourceMappingURL=Logs.js.map