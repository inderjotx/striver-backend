"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCodeSchema = exports.formDataSchema = void 0;
const zod_1 = require("zod");
exports.formDataSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(3, "First name must be at least 3 characters long").max(20, "First name must be at most 20 characters long"),
    lastName: zod_1.z.string().min(3, "Last name must be at least 3 characters long").max(20, "Last name must be at most 20 characters long"),
    code: zod_1.z.string().min(1, "Code must not be empty").max(1024, "Maxmimum code length 1024 characters"),
    language: zod_1.z.enum([
        "JavaScript",
        "Python",
        "Java",
        "C#",
        "C++",
        "TypeScript",
        "Ruby",
        "Go",
        "OCaml",
        "Pascal",
        "PHP",
        "Rust"
    ]),
    language_id: zod_1.z.number().min(45, "Invalid language id").max(74, "Invalid language id"),
    stdIn: zod_1.z.string().optional()
});
exports.execCodeSchema = zod_1.z.object({
    source_code: zod_1.z.string().min(1, "Code must not be empty").max(1024, "Maxmimum code length 1024 characters"),
    // https://ce.judge0.com/#statuses-and-languages-language-get
    language_id: zod_1.z.number().min(45, "Invalid language id").max(74, "Invalid language id"),
    stdIn: zod_1.z.string().optional()
});
