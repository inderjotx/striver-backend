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
exports.executeCode = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
// memory , stderr, time , stdout
dotenv_1.default.config();
const RAPID_API_HOST = process.env.RAPID_API_HOST;
const RAPID_API_KEY = process.env.RAPID_API_KEY;
const RAPID_API_URL = process.env.RAPID_API_URL;
// todo: add types in type.d.ts
function executeCode(code, language_id, stdIn) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: 'POST',
            url: `${RAPID_API_URL}/submissions`,
            params: {
                base64_encoded: 'false',
                wait: 'true',
                fields: 'stdout,time,memory,stderr,status,message'
            },
            headers: {
                'content-type': 'application/json',
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': `${RAPID_API_KEY}`,
                'X-RapidAPI-Host': `${RAPID_API_HOST}`
            },
            data: {
                language_id: language_id,
                source_code: code,
                stdin: stdIn || ""
            }
        };
        try {
            const response = (yield axios_1.default.request(options)).data;
            // 1 means success , rest all error 
            if (response.status.description === 'Accepted') {
                return {
                    success: true,
                    judgeResult: response
                };
            }
            return {
                success: false,
                error: response,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                return {
                    success: false,
                    error: error.message
                };
            }
            else {
                return {
                    success: false,
                    error: "Unknown error using code execution"
                };
            }
        }
    });
}
exports.executeCode = executeCode;
