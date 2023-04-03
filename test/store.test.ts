import { describe, it, expect } from 'vitest'
import createStore from '../src/store/store'

it('should be able to create a store', async ({ expect }) => {
	expect(createStore).toBeDefined()
	expect(createStore).toMatchInlineSnapshot(`
		{
		  "@@observable": [Function],
		  "dispatch": [Function],
		  "getState": [Function],
		  "replaceReducer": [Function],
		  "subscribe": [Function],
		}
	`)
})
