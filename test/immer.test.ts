import { it } from 'vitest'
import produce from 'immer'

it('should not mutate the input', async ({ expect }) => {
	const baseState: {
		scenes: any[string]
	} = {
		scenes: {
			alice: {
				name: 'Alice'
			},
			bob: {
				name: 'Bob'
			}
		}
	}

	const nextState = produce(baseState, (draftState) => {
		draftState.scenes['charlie'] = { name: 'Charlie' }
		return draftState
	})

	expect(nextState).toMatchInlineSnapshot(`
		{
		  "scenes": {
		    "alice": {
		      "name": "Alice",
		    },
		    "bob": {
		      "name": "Bob",
		    },
		    "charlie": {
		      "name": "Charlie",
		    },
		  },
		}
	`)
})
