import React from "react";

function AddPanorama() {
    return (
        <div>
            <p>select panorama images to add</p>
            <input type="file" name="panoramas" id="panoramas" />
            <button>add</button>
        </div>
    );
}

export default AddPanorama;
