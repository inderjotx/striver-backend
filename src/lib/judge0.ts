import axios from 'axios'
import dotevn from 'dotenv'
import { ExecuteCodeReturn, JudgeResult } from '../types'


// memory , stderr, time , stdout

dotevn.config()


const RAPID_API_HOST = process.env.RAPID_API_HOST
const RAPID_API_KEY = process.env.RAPID_API_KEY
const RAPID_API_URL = process.env.RAPID_API_URL



// todo: add types in type.d.ts

export async function executeCode(code: string, language_id: number, stdIn: string | undefined): Promise<ExecuteCodeReturn<boolean>> {


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
        const response: JudgeResult = (await axios.request(options)).data;

        // 1 means success , rest all error 
        if (response.status.description === 'Accepted') {
            return {
                success: true,
                judgeResult: response
            }
        }

        return {
            success: false,
            error: response,
        }

    } catch (error) {

        if (error instanceof Error) {

            return {
                success: false,
                error: error.message
            }
        }
        else {
            return {
                success: false,
                error: "Unknown error using code execution"
            }

        }
    }
}