import { z } from 'zod'

export const formDataSchema = z.object({
    firstName: z.string().min(3, "First name must be at least 3 characters long").max(20, "First name must be at most 20 characters long"),
    lastName: z.string().min(3, "Last name must be at least 3 characters long").max(20, "Last name must be at most 20 characters long"),
    code: z.string().min(1, "Code must not be empty").max(1024, "Maxmimum code length 1024 characters"),
    language: z.enum([
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
    language_id: z.number().min(45, "Invalid language id").max(74, "Invalid language id"),
    stdIn: z.string().optional()
})



export const execCodeSchema = z.object({
    source_code: z.string().min(1, "Code must not be empty").max(1024, "Maxmimum code length 1024 characters"),
    // https://ce.judge0.com/#statuses-and-languages-language-get
    language_id: z.number().min(45, "Invalid language id").max(74, "Invalid language id"),
    stdIn: z.string().optional()
})