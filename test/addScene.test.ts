import { _reset, _addScene } from '../src/store/reducers'
import { describe, it } from 'vitest'
import storeDefaultState from '../src/store/storeDefaultState'

describe('test reducer functions', () => {
	it('_reset should return the default project', async ({ expect }) => {
		const output = _reset({} as any)

		expect(output).toMatchSnapshot()
	})

	it('add scene should add new key to scenes obj', async ({ expect }) => {
		const scene: Scene = {
			hotSpots: [],
			panorama: './assets/testimage.jpg',
			id: 'testid',
			name: 'test object',
			type: 'link'
		}

		const project = storeDefaultState

		const output = _addScene(project, { payload: { scene: scene } })

		expect(output).toMatchSnapshot()
	})
})
