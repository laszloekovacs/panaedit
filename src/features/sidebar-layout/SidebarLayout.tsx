import React from "react";
import AddPanorama from "../add-panorama/AddPanorama";
import CollapsibleContainer from "../collapsible-container/CollapsibleContainer";
import FirstSceneSelect from "../scene-settings/FirstSceneSelect";

function SidebarLayout() {
    return (
        <div>
            <CollapsibleContainer title={"First Scene"}>
                <FirstSceneSelect />
            </CollapsibleContainer>
            <CollapsibleContainer title={"Add panorama images"}>
                <AddPanorama />
            </CollapsibleContainer>
        </div>
    );
}

export default SidebarLayout;
