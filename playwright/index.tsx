// Import styles, initialize component theme here.
// import '../src/common.css';
import '../src/index.css'
import {
	beforeMount,
	afterMount
} from '@playwright/experimental-ct-react/hooks'
import { Provider, useDispatch } from 'react-redux'
import { addScene, store } from '../src/store'
import React from 'react'
/*
beforeMount(async ({ App, hooksConfig }) => {
	const dispatch = useDispatch()

	const testScene: Scene = {
		title: 'testScene',
		northOffset: 0,
		panorama:
			'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg',
		hotSpots: []
	}

	dispatch(addScene({ scene: testScene }))

	return (
		<Provider store={store}>
			<App />
		</Provider>
	)
})
*/
