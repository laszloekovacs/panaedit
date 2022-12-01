import React from "react";

function SceneEdit() {
    return (
        <div>
            <h3>01CA - Vezérigazgató tárgyaló</h3>
            <div>
                <p>north offset: 98.4</p>
                <button>set north</button>
            </div>
            <br />
            <input type="text" name="newhotspot" placeholder="type in new hotspot name" />
            <button>add link to scene</button>
            <button>add info bubble</button>
        </div>
    );
}

export default SceneEdit;
