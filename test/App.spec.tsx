import { test, expect } from '@playwright/experimental-ct-react'
import FileMenu from '../src/components/FileMenu'
import React from 'react'

//test.use({ viewport: { width: 500, height: 500 } });

test('should render', async ({ mount }) => {
	const component = await mount(<FileMenu />)
	await expect(component).toContainText('Greetings')
})
