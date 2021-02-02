"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pino_1 = __importDefault(require("pino"));
const index_1 = __importDefault(require("./index"));
const logger = pino_1.default({
    prettyPrint: true,
});
const deletePersonsGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        index_1.default(`https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${process.env.AZURE_PERSONS_GROUP_ID}`, {
            method: 'DELETE',
            headers: {
                'Ocp-Apim-Subscription-Key': `${process.env.AZURE_KEY}`,
            },
        });
    }
    catch (error) {
        logger.error(error);
    }
});
const trainPersonsGroup = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        index_1.default(`https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${process.env.AZURE_PERSONS_GROUP_ID}/train`, {
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': `${process.env.AZURE_KEY}`,
            },
        });
    }
    catch (error) {
        logger.error(error);
    }
});
const getTrainingStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        index_1.default(`https://westeurope.api.cognitive.microsoft.com/face/v1.0/persongroups/${process.env.AZURE_PERSONS_GROUP_ID}/training`, {
            method: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': `${process.env.AZURE_KEY}`,
            },
        });
    }
    catch (error) {
        logger.error(error);
    }
});
module.exports = {
    deletePersonsGroup,
    trainPersonsGroup,
    getTrainingStatus,
};
//# sourceMappingURL=group.crud.js.map