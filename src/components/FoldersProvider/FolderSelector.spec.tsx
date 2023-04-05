import { test, expect } from '@playwright/experimental-ct-react'

import React from 'react'
import FolderSelector from './FolderSelector'

test.use({ viewport: { width: 400, height: 600 } })

test('should render with proper css', async ({ mount }) => {
	const element = await mount(<FolderSelector onClick={() => {}} />)

	await expect(element.getByRole('button')).toContainText('Select directory')
})
