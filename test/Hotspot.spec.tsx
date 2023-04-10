import React from 'react'
import Hotspot from '../src/components/Hotspot'
import { test, expect } from '@playwright/experimental-ct-react'

test('Test <Hotspot>', async ({ mount }) => {
	const container = await mount(<Hotspot />)

	await expect(container).toHaveText('hotspots')
})
