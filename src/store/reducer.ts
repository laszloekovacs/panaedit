import produce from "immer"
import { AnyAction, Reducer } from "redux"
import { storeDefaults, store } from "./store"
import { Store } from "./types"

export type ActionType =
   | "UNLOAD"
   | "LOAD_FILE"
   | "ADD_ARTICLE"
   | "REMOVE_ARTICLE"
   | "ADD_SCENE"
   | "RESET"
   | "SET_FIRST_SCENE"
   | "ADD_HOTSPOT"
   | "REMOVE_HOTSPOT"
   | "UPDATE_ARTICLE"
   | "SET_PINNED"
   | "RESET_PINNED"
   | "DELETE_IMAGE"
   | "PASTE_IMAGES"
   | "SET_NORTH"
   | "SET_EDITOR_SCENE"
   | "SET_SCENE_TITLE"
   | "ADD_IMAGE_LABEL"
   | "ADD_PANORAMA"

export type Action = {
   type: ActionType
   payload?: unknown
}

export const reducer: Reducer = (store: Store, action: Action): Store => {
   switch (action.type) {
      case "RESET": {
         return storeDefaults
      }

      case "LOAD_FILE": {
         return { ...storeDefaults, ...(action.payload as object) }
      }

      case "UNLOAD": {
         return storeDefaults
      }

      case "SET_FIRST_SCENE": {
         return produce(store, (draft) => {
            draft.default.firstScene = action.payload as string
         })
      }

      case "ADD_PANORAMA": {
         const filename = action.payload as string
         const scenename = filename.substring(0, filename.lastIndexOf("."))

         /* if we have it already in the store then skip it */
         if (store.scenes[scenename] != undefined) {
            console.log(scenename + " already loaded, skipping")
            return store
         }

         return produce(store, (draft) => {
            draft.scenes[scenename] = {
               title: scenename,
               panorama: filename,
               northOffset: 0,
               hotSpots: [],
            }
         })
      }

      case "SET_EDITOR_SCENE": {
         return produce(store, (draft) => {
            draft.editor.currentScene = action.payload as string
         })
      }

      case "SET_SCENE_TITLE": {
         return produce(store, (draft) => {
            const id = action.payload.scene as string
            draft.scenes[id].title = action.payload.title
         })
      }

      case "SET_NORTH": {
         return produce(store, (draft) => {
            const id = action.payload.scene as string
            draft.scenes[id].northOffset = action.payload.yaw
         })
      }

      default: {
         return store
      }
   }
}
