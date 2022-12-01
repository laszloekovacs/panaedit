import React from "react";

const dummyScenes = ["ab - vezérigazgató", "ba - előszoba", "fg - folyosó", "er- öltöző", "dfs - konyha", "er - iroda"];

function SceneList() {
    const list = dummyScenes.map((item) => {
        return (
            <li>
                <button key={item}>{item}</button>
            </li>
        );
    });

    return <ul>{list}</ul>;
}

export default SceneList;
