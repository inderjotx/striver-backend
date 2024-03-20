import { formDataSchema } from "../lib/validation";
import { z } from "zod";

export interface JudgeResult {
    stdout: string | null,
    time: string;
    memory: number;
    stderr: string | null;
    message: string | null;
    status: {
        id: number;
        description: string;
    };
}


export type FormDataType = z.infer<typeof formDataSchema>



export type ExecuteCodeReturn<T extends boolean> = T extends true ? { success: true, judgeResult: JudgeResult } : { success: false, error: string | JudgeResult }