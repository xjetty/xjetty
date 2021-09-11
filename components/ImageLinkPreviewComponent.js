import {AppContext} from "../contexts/AppContext";
import React, {useContext} from "react";

const ImageLinkPreviewComponent = () => {
    const {imageLink} = useContext(AppContext)
    return (
        <img
            style={{width: '100%', maxWidth: '500px', height: "auto"}}
            src={imageLink}
            alt="Preview image"
        />
    )
}

export default ImageLinkPreviewComponent