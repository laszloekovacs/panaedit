import React from 'react'
import PanoramaListItem from './PanoramaListItem'

import { useEditor } from '../hooks'
import { filterCache } from '../functions/filterCache'
import styles from './Panorama.module.scss'

const PanoramaList = () => {
	const { cache } = useEditor()

	const list = filterCache(cache, /^panoramas/)

	return (
		<ul className={styles.PanoramaList}>
			{list.map((item, index) => (
				<PanoramaListItem key={index} item={item} />
			))}
		</ul>
	)
}

export default PanoramaList
