const size = 10
const visualise = (pixels) => {
	const canvas = document.getElementById('canvas')
	const ctx = canvas.getContext('2d')
	const width = canvas.width
	const height = canvas.height
	const pixelWidth = width / size
	const pixelHeight = height / size
	pixels.forEach((pixel, i) => {
		const x = (i % size) * pixelWidth
		const y = Math.floor(i / size) * pixelHeight
		ctx.fillStyle = pixel
		ctx.fillRect(x, y, pixelWidth, pixelHeight)
		ctx.strokeStyle = 'black'
		ctx.lineWidth = 5
		ctx.strokeRect(x, y, pixelWidth, pixelHeight)
	})
}

while (true) {
	try {
		const response = await fetch('/api/matrix')
		const data = await response.json()
		visualise(data)
	} catch (error) {
		console.error(error)
		await new Promise((resolve) => setTimeout(resolve, 3000))
	}
	await new Promise((resolve) => setTimeout(resolve, 1000))
}
