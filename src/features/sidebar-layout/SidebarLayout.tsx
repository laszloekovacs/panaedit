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
            <CollapsibleContainer title={"First scene"}>
                <FirstSceneSelect />
            </CollapsibleContainer>
            <CollapsibleContainer title={"Add panorama images"}>
                <AddPanorama />
            </CollapsibleContainer>
            <CollapsibleContainer title={"Scene list"}>
                <SceneList />
            </CollapsibleContainer>
            <CollapsibleContainer title={"Edit +selected scene+"}>
                <SceneEdit />
            </CollapsibleContainer>
            <CollapsibleContainer title={"Hotspots"}>
                <HotspotList />
            </CollapsibleContainer>
        </div>
    );
}

export default SidebarLayout;
