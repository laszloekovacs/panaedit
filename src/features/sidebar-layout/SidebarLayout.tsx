import React from "react";
import CollapsibleContainer from "../collapsible-container/CollapsibleContainer";
import FirstSceneSelect from "../scene-settings/FirstSceneSelect";

function SidebarLayout() {
    return (
        <div>
            <CollapsibleContainer title={"Project Settings"}>
                <FirstSceneSelect />
            </CollapsibleContainer>
        </div>
    );
}

export default SidebarLayout;
