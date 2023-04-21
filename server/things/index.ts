import { randomId } from './randomId'

type ThingCommon = {
	id: string
	note?: string
	allowedGithubUsers?: string[]
}

type Light = ThingCommon & {
	type: 'light'
	state: 'on' | 'off'
	changeState: (newState: Light['state']) => void
}

type RgbLight = ThingCommon & {
	type: 'rgbLight'
	color: string // @TODO: add string shape
	changeColor: (newColor: RgbLight['color']) => void
}

type Vacuum = ThingCommon & {
	type: 'vacuum'
	state: 'home' | 'returningHome' | 'working' | 'idle'
}

type Television = ThingCommon & {
	type: 'television'
	nowPlaying: string
	availableChannels: string[]
}

type WashingMachine = ThingCommon & {
	type: 'washingMachine'
	state: 'on' | 'off'
}

type MotionSensor = ThingCommon & {
	type: 'motionSensor'
	state: 'motionDetected' | 'noMotion'
}

type Thing =
	| Light
	| RgbLight
	| Vacuum
	| Television
	| WashingMachine
	| MotionSensor

export const initializeThings = () => {
	const things: Thing[] = []

	const listThings = () =>
		things.map((thing) => ({
			id: thing.id,
			type: thing.type,
		}))

	const addLight = (note?: string) => {
		const type = 'light'
		const thing: Light = {
			id: randomId(type),
			type,
			state: 'off',
			changeState: (newState) => {
				thing.state = newState
			},
			note,
		}
		things.push(thing)
	}

	const addRgbLight = (note?: string, allowedGithubUsers?: string[]) => {
		const type = 'rgbLight'
		const thing: RgbLight = {
			id: randomId(type),
			type,
			color: '#000000',
			changeColor: (newColor: RgbLight['color']) => {
				thing.color = newColor
			},
			note,
			allowedGithubUsers,
		}
		things.push(thing)
	}

	const addVacuum = () => {
		const type = 'vacuum'
		things.push({
			id: randomId(type),
			type,
			state: 'idle',
		})
	}

	const addTelevision = () => {
		const type = 'television'
		things.push({
			id: randomId(type),
			type,
			nowPlaying: 'Déčko',
			availableChannels: ['ČT1', 'ČT2', 'Déčko', 'Nova', 'Prima'],
		})
	}

	const addWashingMachine = () => {
		const type = 'washingMachine'
		things.push({
			id: randomId(type),
			type,
			state: 'off',
		})
	}

	const addMotionSensor = (
		note?: string,
		initialState: MotionSensor['state'] = 'noMotion',
	) => {
		const type = 'motionSensor'
		things.push({
			id: randomId(type),
			type,
			state: initialState,
			note,
		})
	}

	const getThing = (id: Thing['id']) =>
		things.find((thing) => thing.id === id) ?? null

	return {
		listThings,
		addLight,
		addRgbLight,
		addVacuum,
		addTelevision,
		addWashingMachine,
		addMotionSensor,
		getThing,
	}
}
