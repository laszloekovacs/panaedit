import React from 'react'
import AsyncComponent from './AsyncComponent'

import { test, expect } from '@playwright/experimental-ct-react'

test('AsyncComponent', async ({ mount }) => {
	const elem = await mount(<AsyncComponent />)
	expect(elem).toBeDefined()
})
