import React from 'react'
import { test, expect } from '@playwright/experimental-ct-react'

import ErrorBoundary from '../src/components/ErrorBoundary'

test.skip('should render', async ({ mount }) => {
	/* intentionally cause a throw */
	const ThrowingComponent = () => {
		throw new Error('Error')
	}

	const Fallback = () => <div>Something went wrong</div>

	const Wrapper = () => {
		return (
			<ErrorBoundary fallback={<Fallback />}>
				<ThrowingComponent />
			</ErrorBoundary>
		)
	}

	const component = await mount(<Wrapper />)
	await expect(component).toThrow()
})
