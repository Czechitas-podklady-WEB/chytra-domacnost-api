import { initializeThings } from './index'

export const createDemoThings = () => {
	const things = initializeThings()

	things.addTelevision()

	things.addWashingMachine()

	things.addRgbLight('Obývák')
	things.addRgbLight('Kuchyň')
	things.addRgbLight('Dětský pokoj')

	things.addMotionSensor('Vstupní dveře')

	things.addMotionSensor('Dětský pokoj', 'motionDetected')

	things.addVacuum()

	for (let i = 0; i < 102; i++) {
		things.addRgbLight()
	}

	return things
}
