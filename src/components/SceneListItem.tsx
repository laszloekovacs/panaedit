import React from 'react'
import previewicon from '../../public/img/preview.svg'
import flagicon from '../../public/img/flag.svg'

// 1997 phoenix lights

type Props = {
	title: string
	sceneKey: string
	isFirst: boolean
	isActive: boolean
	onClick: (key: string) => void
	numHotspots: number
}

const SceneListItem = ({
	title,
	sceneKey,
	isFirst,
	isActive,
	onClick,
	numHotspots
}: Props) => {
	return (
		<li
			onClick={() => onClick(sceneKey)}
			className="flex flex-row justify-between p-1 px-2 odd:bg-slate-500 odd:bg-opacity-25"
		>
			<div className="grid grid-cols-1">
				<p>{title}</p>
				<p>{sceneKey}</p>
			</div>
			<div className="grid grid-cols-2">
				<img
					className={isFirst ? 'visible' : 'invisible'}
					src={flagicon}
					width="18"
				/>
				<img
					className={isActive ? 'visible' : 'invisible'}
					src={previewicon}
					width="18"
				/>
				{numHotspots > 0 && <p>{numHotspots}</p>}
			</div>
		</li>
	)
}

export default SceneListItem
