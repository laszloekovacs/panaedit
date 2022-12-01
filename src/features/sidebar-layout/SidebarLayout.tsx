import React from "react";
import AddPanorama from "../add-panorama/AddPanorama";
import CollapsibleContainer from "../collapsible-container/CollapsibleContainer";
import FirstSceneSelect from "../first-scene/FirstSceneSelect";
import HotspotList from "../hotspots/HotspotList";
import SceneList from "../scene-list/SceneList";
import SceneEdit from "../scene-edit/SceneEdit";

function SidebarLayout() {
    return (
        <div>
            <CollapsibleContainer title={"FIRST SCENE"}>
                <FirstSceneSelect />
            </CollapsibleContainer>
            <CollapsibleContainer title={"ADD PANORAMA IMAGES"}>
                <AddPanorama />
            </CollapsibleContainer>
            <CollapsibleContainer title={"SCENE LIST"}>
                <SceneList />
            </CollapsibleContainer>
            <CollapsibleContainer title={"EDIT SCENE"}>
                <SceneEdit />
            </CollapsibleContainer>
            <CollapsibleContainer title={"HOTSPOTS"}>
                <HotspotList />
            </CollapsibleContainer>
        </div>
    );
}

export default SidebarLayout;
