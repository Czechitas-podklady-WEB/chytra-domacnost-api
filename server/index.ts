import express from 'express'
import { apiRouter } from './api/index'

const port = Number(process.env.PORT) || 8000

const app = express()

app.use(express.static('public'))
app.use('/api', apiRouter)

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}.`)
})
