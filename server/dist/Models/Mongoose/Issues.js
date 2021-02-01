"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const Issues = mongoose_1.model('issues', new mongoose_1.Schema({
    type: { type: String, required: true },
    active: { type: Number, required: true, default: true },
    reportedBy: { type: Number, required: true },
    createdOn: { type: Date, required: true },
}));
module.exports = Issues;
//# sourceMappingURL=Issues.js.map