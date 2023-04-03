import { resetReducer } from '../src/store/reducers/scene'
import { describe, it, expect } from 'vitest'

it('should return the default', () => {
	expect(resetReducer).toBeDefined()

	const input = {
		hello: 'there'
	}

	const output = resetReducer(input as any, { type: 'reset' })

	expect(output).toEqual(input)
})
