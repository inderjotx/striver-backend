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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTags = exports.getSnippetsWithDisconnect = exports.createSnippetWithDisconnect = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// wrapper response for disconnecting prisma client once operation is done 
exports.createSnippetWithDisconnect = withDisconnectClient(createSnippet);
exports.getSnippetsWithDisconnect = withDisconnectClient(getSnippets);
function getTags() {
    try {
        const data = client_1.Tags;
        return {
            success: true,
            data: data
        };
    }
    catch (err) {
        if (err instanceof Error) {
            return {
                success: false,
                error: err.message
            };
        }
        else {
            return {
                success: false,
                error: "Error fetching data"
            };
        }
    }
}
exports.getTags = getTags;
function getSnippets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield prisma.snippet.findMany({
                orderBy: {
                    createdAt: 'desc'
                }
            });
            return {
                success: true,
                data: data
            };
        }
        catch (err) {
            if (err instanceof Error) {
                return {
                    success: false,
                    error: err.message
                };
            }
            else {
                return {
                    success: false,
                    error: "Error fetching data"
                };
            }
        }
    });
}
function getTagsEnum(tags) {
    const data = [];
}
function createSnippet(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield prisma.snippet.create({
                data: {
                    firstName: data.firstName,
                    lastName: data.language,
                    language: data.language,
                    stdOut: data.stdOut,
                    stdIn: data.stdIn,
                    code: data.code,
                    // @ts-ignore
                    tags: data.tags
                }
            });
            return {
                success: true
            };
        }
        catch (err) {
            console.log(err);
            if (err instanceof Error) {
                return {
                    success: false,
                    error: err.message
                };
            }
            return {
                success: false,
                error: "Error while creating snippet"
            };
        }
    });
}
function withDisconnectClient(operation) {
    return (...args) => __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield operation(...args);
            yield prisma.$disconnect();
            return result;
        }
        catch (error) {
            console.error(error);
            yield prisma.$disconnect();
            throw error;
        }
    });
}
