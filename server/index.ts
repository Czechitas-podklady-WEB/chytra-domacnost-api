import express from 'express'
import { apiRouter } from './api/index'

const port = false ? Number(0) : 8000

const app = express()

// app.use(apiRouter.routes())

app.use(express.static('public'))
app.use('/api', apiRouter)

// // Serve public directory
// app.use(async (context, next) => {
// 	try {
// 		await context.send({
// 			root: `${Deno.cwd()}/public`,
// 			index: 'index.html',
// 		})
// 	} catch {
// 		next()
// 	}
// })

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}.`)
})
