import React from 'react'
import { test, expect } from '@playwright/test'

test('loader test', async ({ page }) => {
	await page.goto('http://localhost:5173/')
	await page
		.getByRole('button', { name: 'Select local working directory' })
		.click()
	await page.getByText('photos').click()
})
