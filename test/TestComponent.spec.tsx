import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'

import TestComponent from '../src/components/TestComponent'

//test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
	const component = await mount(<TestComponent />)
	await expect(component).toBeVisible()
})
