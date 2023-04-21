import { githubUsers } from '../utilities/githubUsers'
import { initializeThings } from './index'

export const createDemoThings = () => {
	const things = initializeThings()

	things.addTelevision()

	things.addWashingMachine()

	things.addLight('Lampička v dětském pokoji')
	things.addRgbLight('Obývák')
	things.addRgbLight('Kuchyň')

	things.addMotionSensor('Vstupní dveře')

	things.addMotionSensor('Dětský pokoj', 'motionDetected')

	things.addVacuum()

	for (let i = 0; i < 100; i++) {
		const userIndex = Math.floor((i - githubUsers.length / 2) / 2)
		const allowedGithubUsers =
			userIndex >= 0 && userIndex < githubUsers.length
				? [githubUsers[userIndex]]
				: []
		things.addRgbLight(
			`Světlo ${i % 10}:${Math.floor(i / 10)}`,
			allowedGithubUsers,
		)
	}

	return things
}
