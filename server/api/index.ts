import bodyParser from 'body-parser'
import cors from 'cors'
import express, { Request } from 'express'
import fetch from 'node-fetch'
import { createDemoThings } from '../things/createDemoThings'
import { fakeGodGithubUser } from '../utilities/githubUsers'

export const apiRouter = express.Router()

const things = createDemoThings()

apiRouter.use(cors())
apiRouter.use(bodyParser.json())

const getAllowedGithubUsers = async (
	request: Request,
): Promise<undefined | string> => {
	const bearerHeader = request.headers['authorization']

	if (typeof request.query.god === 'string') {
		return fakeGodGithubUser
	}

	const [type, value] = (bearerHeader ?? '').split(' ')
	if (type !== 'Bearer') {
		return
	}

	try {
		const response = await fetch('https://kodim.cz/api/me', {
			headers: {
				Authorization: `Bearer ${value}`,
			},
		})
		const data: any = await response.json()
		return data.name
	} catch (error) {
		console.error(error)
	}

	return
}

apiRouter
	.get('/things', async (request, response) => {
		const url =
			request.protocol + '://' + request.get('host') + request.originalUrl
		let { origin } = new URL(url)
		if (!origin.includes('localhost')) {
			origin = origin.replace('http:', 'https:')
		}

		response.json({
			things: things
				.listThings(await getAllowedGithubUsers(request))
				.map((thing) => ({
					...thing,
					url: `${origin}/api/thing/${thing.id}`,
				})),
		})
	})
	.get('/thing/:id', (request, response) => {
		const thing = things.getThing(request.params.id)
		response.json(thing)
	})
	.post('/thing/:id', async (request, response) => {
		const thing = things.getThing(request.params.id)
		if (thing?.type === 'light') {
			const data = request.body
			const state: unknown = data.state

			if (state === 'on' || state === 'off') {
				console.log(`Changing state to ${state}`)
				thing.changeState(state)

				response.json(thing)
			} else {
				response.json({
					error: 'Bad data',
				})
			}
		} else if (thing?.type === 'rgbLight') {
			const data = request.body
			const color: unknown = data.color

			if (
				typeof color === 'string' &&
				color.toUpperCase().match(/^#[0123456789ABCDEF]{6}$/) !== null
			) {
				console.log(`Changing color to ${color}`)
				thing.changeColor(color.toUpperCase())

				response.json(thing)
			} else {
				response.json({
					error: 'Bad data',
				})
			}
		}
	})
