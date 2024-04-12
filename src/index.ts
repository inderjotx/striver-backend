import express, { Request, Response } from 'express'
import { formDataSchema, execCodeSchema } from './lib/validation'
import { executeCode } from './lib/judge0'
import cors from 'cors'
import { getTags, createSnippetWithDisconnect, getSnippetsWithDisconnect } from './lib/db'
import { getSnippets, invalidateCache, setSnippets } from './lib/redis'


const FRONTEND_URL = process.env.FRONT_END_URL!


const app = express()

const corsOptions = {
	origin: FRONTEND_URL
}

app.use(cors(corsOptions))

app.use(express.json())




app.get('/snippets', async (req: Request, res: Response) => {


	// is in cache 
	console.log("req")
	// const inCache = await getSnippets('snippets')

	const inCache = false

	if (!inCache) {

		const response = await getSnippetsWithDisconnect()

		if (response.success) {
			// setting cache 
			await setSnippets('snippets', response.data)
		}


		res.json(response).status(200)


	}

	else {
		console.log('cache hit')
		res.json({ success: true, data: inCache }).status(200)
	}

})


app.get('/tags', async (req: Request, res: Response) => {


	// is in cache 
	console.log("req to get tags ")

	const response = getTags()

	res.json(response).status(200)




})





app.post('/code', async (req: Request, res: Response) => {
	const data = req.body

	const isValid = formDataSchema.safeParse(data)

	if (isValid.success) {

		// execute first 
		const result = await executeCode(isValid.data.code, isValid.data.language_id, isValid.data.stdIn)

		if (result.success) {

			const stdOut = (result.judgeResult.stdout) ? result.judgeResult.stdout : ""
			const hasCreated = await createSnippetWithDisconnect({ ...isValid.data, stdOut: stdOut })

			if (hasCreated.success) {

				// invalidate cache after update
				await invalidateCache('snippets')

			}

			res.json(hasCreated).status(200)

		}

		else {

			// has information 
			res.status(200).json(result)
		}



	}

	else {
		res.status(400).json({ success: false, error: "Invalid Form Data", details: isValid.error })
	}

})


app.post('/exec', async (req: Request, res: Response) => {

	const data = req.body

	const isValid = execCodeSchema.safeParse(data)

	if (isValid.success) {

		// making all to judge0
		const response = await executeCode(isValid.data.source_code, isValid.data.language_id, isValid.data.stdIn)
		res.status(200).json(response)
	}

	else {
		res.status(400).json({ success: false, error: "Invalid Form Data", details: isValid.error })
	}

})





app.listen(5000, () => {
	console.log("App is liseting on port 5000")
})
