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
const express_1 = __importDefault(require("express"));
const validation_1 = require("./lib/validation");
const judge0_1 = require("./lib/judge0");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./lib/db");
const redis_1 = require("./lib/redis");
const FRONTEND_URL = process.env.FRONT_END_URL;
const app = (0, express_1.default)();
const corsOptions = {
    origin: FRONTEND_URL
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.get('/snippets', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // is in cache 
    console.log("req");
    // const inCache = await getSnippets('snippets')
    const inCache = false;
    if (!inCache) {
        const response = yield (0, db_1.getSnippetsWithDisconnect)();
        if (response.success) {
            // setting cache 
            yield (0, redis_1.setSnippets)('snippets', response.data);
        }
        res.json(response).status(200);
    }
    else {
        console.log('cache hit');
        res.json({ success: true, data: inCache }).status(200);
    }
}));
app.get('/tags', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // is in cache 
    console.log("req to get tags ");
    const response = (0, db_1.getTags)();
    res.json(response).status(200);
}));
app.post('/code', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isValid = validation_1.formDataSchema.safeParse(data);
    if (isValid.success) {
        // execute first 
        const result = yield (0, judge0_1.executeCode)(isValid.data.code, isValid.data.language_id, isValid.data.stdIn);
        if (result.success) {
            const stdOut = (result.judgeResult.stdout) ? result.judgeResult.stdout : "";
            const hasCreated = yield (0, db_1.createSnippetWithDisconnect)(Object.assign(Object.assign({}, isValid.data), { stdOut: stdOut }));
            if (hasCreated.success) {
                // invalidate cache after update
                yield (0, redis_1.invalidateCache)('snippets');
            }
            res.json(hasCreated).status(200);
        }
        else {
            // has information 
            res.status(200).json(result);
        }
    }
    else {
        res.status(400).json({ success: false, error: "Invalid Form Data", details: isValid.error });
    }
}));
app.post('/exec', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const isValid = validation_1.execCodeSchema.safeParse(data);
    if (isValid.success) {
        // making all to judge0
        const response = yield (0, judge0_1.executeCode)(isValid.data.source_code, isValid.data.language_id, isValid.data.stdIn);
        res.status(200).json(response);
    }
    else {
        res.status(400).json({ success: false, error: "Invalid Form Data", details: isValid.error });
    }
}));
app.listen(5000, () => {
    console.log("App is liseting on port 5000");
});
