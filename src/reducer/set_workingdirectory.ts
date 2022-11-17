import type { ReduxActionType, SceneType } from "./storeDefaults";
import produce from "immer";

const set_workingdirectory = (state: SceneType, action: ReduxActionType) => {
  return produce(state, (draft: SceneType) => {
    if (action.payload instanceof FileSystemDirectoryHandle) {
      draft.editor.workingDirectory = action.payload;
    } else {
      throw new Error("Failed to store working directory handle");
    }
  });
};

export default set_workingdirectory;
