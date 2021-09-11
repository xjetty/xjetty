import {Button} from "@material-ui/core";
import {OpenInNew} from "@material-ui/icons";
import React from "react";

const GetImageLinkButton = () => {
    return (
        <Button href="https://postimages.org" target="_blank" color="primary" endIcon={<OpenInNew/>}>
            Get image link here
        </Button>
    )
}

export default GetImageLinkButton