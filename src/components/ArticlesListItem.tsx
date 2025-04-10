import React from 'react'

type Props = {
	article: CacheLine
}

const ArticlesListItem = ({ article }: Props) => {
	const { key, value } = article

	// get filename from path
	const filename = key.split('/').pop()

	return (
		<li className="relative aspect-video bg-neutral-900 bg-opacity-10 p-1">
			<p className="z-20 absolute bg-stone-600 bg-opacity-50">
				{filename}
			</p>
		</li>
	)
}

export default ArticlesListItem
