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

	for (let i = 0; i < 102; i++) {
		things.addRgbLight()
	}

	return things
}
