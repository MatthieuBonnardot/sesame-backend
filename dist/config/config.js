"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    server: {
        hostname: process.env.SERVER_HOSTNAME,
        port: process.env.SERVER_PORT,
    },
    azure: {
        key: process.env.AZURE_KEY,
        backup_key: process.env.AZURE_KEY2,
        group_name: process.env.AZURE_PERSONS_GROUP_ID,
        enpoint: process.env.AZURE_ENDPOINT,
        location: process.env.AZURE_LOCATION,
    },
    mongo: {
        uri: process.env.MONGO_DB_URI,
        test: process.env.MONGO_DB_URI_TEST,
    },
    postgres: {
        uri: process.env.POSTGRES_URI,
        uri_admin: process.env.POSTGRES_URI_ADMIN,
    },
    email: {
        user: process.env.EMAIL_USER,
        password: process.env.EMAIL_PASSWORD,
    },
};
exports.default = config;
//# sourceMappingURL=config.js.map