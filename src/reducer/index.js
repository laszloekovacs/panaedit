import storeDefaults from './storeDefaults'


function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}


export default function reducer(store = storeDefaults, action) {
    const copy = clone(store)

    switch (action.type) {
        case "LOAD_FILE":
            return action.payload

        case "ADD_ARTICLE":
            copy.articles.push({ title: action.payload })
            return copy;

        case "REMOVE_ARTICLE":
            copy.articles = copy.articles.filter(a => a.title != action.payload)
            return copy;

        case "ADD_SCENE":
            const basename = action.payload.split(".")[0]

            copy.scenes[basename] = { title: basename, panorama: store.default.basePath + action.payload }
            return copy;

        case "RESET":
            return storeDefaults;

        case "SET_FIRST_SCENE":
            copy.default.firstScene = action.payload;
            return copy;

        default:
            return store
    }
}