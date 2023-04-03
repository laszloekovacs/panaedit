import { _reset } from '../src/store/reducers/scene'
import { describe, it } from 'vitest'

it('should return the default values', async ({ expect }) => {
	expect(_reset).toBeDefined()

	const output = _reset({} as any)

	// output should contain the default key
	expect(output).toHaveProperty('default')
})
