import { deleteImageAction, removeImage as cutImg } from './actions';
import storeDefaults from './storeDefaults'


function clone(obj) {
    return JSON.parse(JSON.stringify(obj))
}


function addHotspot(store, hotspot) {
    const { title, ...newSpot } = hotspot;

    if (store.scenes[title]?.hotSpots == undefined) {
        store.scenes[title].hotSpots = [];
    }

    store.scenes[title].hotSpots.push(newSpot);

    return store;
}

function removeHotspot(store, payload) {

    const { index, parent } = payload;
    console.log(parent)

    if (store.scenes?.[parent]?.hotSpots[index]) {
        const hotspots = store.scenes?.[parent]?.hotSpots.filter((v, i) => i != index)

        store.scenes[parent].hotSpots = hotspots;
    }

    return store;
}

function updateArticle(store, payload) {
    // find the index of the article we are currently editing and replace it
    const predicate = (elem) => elem.title == payload.oldTitle;

    const index = store.articles.findIndex(predicate)
    if (index == -1)
        console.error("cannot find article")

    store.articles[index].title = payload.newTitle;
    store.articles[index].text = payload.text;

    return store;
}


function deleteImage(store, payload) {
    const predicate = (elem) => elem.title == payload.article;

    const index = store.articles.findIndex(predicate)

    store.articles[index].images = store.articles[index].images.filter((p, i) => i != payload.index)

    return store;

}

function setImage(store, payload) {
    const predicate = (elem) => elem.title == payload.article;

    const index = store.articles.findIndex(predicate)

    /* clean out duplicates */
    const set = new Set([...store.articles[index].images, ...payload.images])

    store.articles[index].images = Array.from(set);

    return store;
}

/*
* ===============================================
*/
export default function reducer(store = storeDefaults, action) {
    const copy = clone(store)

    switch (action.type) {
        case "LOAD_FILE":
            return action.payload

        case "ADD_ARTICLE":
            copy.articles = [...copy.articles, { title: action.payload, images: [] }]
            return copy;

        case "REMOVE_ARTICLE":
            copy.articles = copy.articles.filter(a => a.title != action.payload)
            return copy;

        case "ADD_SCENE":
            const basename = action.payload.split(".")[0]

            copy.scenes[basename] = { title: basename, panorama: action.payload }
            return copy;

        case "RESET":
            return storeDefaults;

        case "SET_FIRST_SCENE":
            copy.default.firstScene = action.payload;
            return copy;

        case "ADD_HOTSPOT":
            return addHotspot(copy, action.payload)

        case "REMOVE_HOTSPOT":
            return removeHotspot(copy, action.payload)

        case "UPDATE_ARTICLE":
            return updateArticle(copy, action.payload)

        case "SET_PINNED":
            copy.pinned = action.payload
            return copy;

        case "RESET_PINNED":
            copy.pinned = null;
            return copy;

        case "DELETE_IMAGE":
            return deleteImage(copy, action.payload);

        case "PASTE_IMAGES":
            return setImage(copy, action.payload);

        default:
            return store
    }
}
