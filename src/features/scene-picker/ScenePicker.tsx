import React from "react"
import { useDispatch, useSelector } from "react-redux"
import type { Store } from "../../store/types"
import PickerItem from "./PickerItem"
// @ts-ignore
import styles from "./picker.module.scss"

type propType = {
   onClose: () => void
}

function ScenePicker({ onClose }: propType) {
   const scenes = useSelector((store: Store) => store.scenes)
   const dispatch = useDispatch()

   const list = Object.keys(scenes)

   const handleClickItem = (item) => {
      dispatch({ type: "SET_FIRST_SCENE", payload: item })
      onClose()
   }

   return (
      <>
         <div className={styles.facade} onClick={() => onClose()}></div>
         <div className={styles.container}>
            <div className={styles.dialog}>
               <div>
                  <h1>Pick Scene</h1>
                  <button onClick={() => onClose()}>cancel</button>
               </div>

               {list.length == 0 ? (
                  <p>No panorama images in the project, can't set staring panorama</p>
               ) : (
                  <ul>
                     {list.map((item) => (
                        <PickerItem onClick={() => handleClickItem(item)} item={item} title={scenes[item].title}></PickerItem>
                     ))}
                  </ul>
               )}
            </div>
         </div>
      </>
   )
}

export default ScenePicker
