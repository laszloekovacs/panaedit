import { resetReducer } from '../src/store/reducers/scene'
import { describe, it, expect } from 'vitest'

it('should return the default values', () => {
	expect(resetReducer).toBeDefined()

	const output = resetReducer({} as any, { type: 'reset' })

	// output should contain the default key
	expect(output).toHaveProperty('default')
})
