import { PrismaClient, Snippet, Tags } from "@prisma/client";
import { FormDataType } from "../types";

const prisma = new PrismaClient()

// wrapper response for disconnecting prisma client once operation is done 
export const createSnippetWithDisconnect = withDisconnectClient(createSnippet)
export const getSnippetsWithDisconnect = withDisconnectClient(getSnippets)



export function getTags() {


    try {

        const data = Tags

        return {
            success: true,
            data: data
        }


    }
    catch (err) {

        if (err instanceof Error) {

            return {
                success: false,
                error: err.message
            }

        }

        else {

            return {
                success: false,
                error: "Error fetching data"
            }
        }

    }


}


async function getSnippets(): Promise<{ success: true, data: Snippet[] } | { success: false, error: string }> {

    try {

        const data = await prisma.snippet.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return {
            success: true,
            data: data
        }


    }
    catch (err) {

        if (err instanceof Error) {

            return {
                success: false,
                error: err.message
            }

        }

        else {

            return {
                success: false,
                error: "Error fetching data"
            }
        }

    }
}


function getTagsEnum(tags: string[]) {

    const data: Tags[] = []


}




async function createSnippet(data: FormDataType & { stdOut: string }) {




    try {


        await prisma.snippet.create({
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
        })

        return {
            success: true
        }

    }

    catch (err) {

        console.log(err)
        if (err instanceof Error) {

            return {
                success: false,
                error: err.message
            }

        }

        return {
            success: false,
            error: "Error while creating snippet"
        }

    }


}


function withDisconnectClient<T extends (...args: any[]) => Promise<any>>(operation: T): (...args: Parameters<T>) => Promise<ReturnType<T>> {

    return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
        try {
            const result = await operation(...args);
            await prisma.$disconnect();
            return result;
        } catch (error) {
            console.error(error);
            await prisma.$disconnect();
            throw error;
        }

    }
}
