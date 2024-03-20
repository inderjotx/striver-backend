import { Snippet } from '@prisma/client'
import { Redis } from '@upstash/redis'
import dotenv from 'dotenv'


dotenv.config()


const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL!
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN!



const redis = new Redis({
    url: REDIS_URL,
    token: REDIS_TOKEN,
})



export async function getSnippets(key: string): Promise<null | Snippet[]> {
    return await redis.get(key)
}


export async function setSnippets(key: string, data: Snippet[]) {
    await redis.set(key, data)
}


export async function invalidateCache(key: string) {

    await redis.expire(key, 0)
}
