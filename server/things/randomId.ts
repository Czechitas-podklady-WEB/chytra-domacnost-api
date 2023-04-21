import seedrandom from 'seedrandom'

const seed = seedrandom('things')

const characters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f']

export const randomId = (type: string) => {
	const randomIdFragment = () =>
		new Array(6)
			.fill(null)
			.map(() => characters[Math.floor(seed() * characters.length)])
			.join('')

	return `${type.substring(0, 3)}-${randomIdFragment()}-${randomIdFragment()}`
}
