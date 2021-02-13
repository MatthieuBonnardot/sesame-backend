"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var issueSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    active: { type: Number, required: true, default: true },
    reportedBy: { type: String, required: true },
    createdOn: { type: String, required: false, default: new Date() },
});
var issuesModel = mongoose_1.model('Issue', issueSchema);
exports.default = issuesModel;
//# sourceMappingURL=Issues.js.map