import _ from 'lodash'

export interface SceneArrayItem {
	key: string
	scene: Scene
}

export function scenesToArray(scenes: {
	[key: string]: Scene
}): SceneArrayItem[] {
	return _.map(scenes, (scene, key) => ({ key, scene }))
}
