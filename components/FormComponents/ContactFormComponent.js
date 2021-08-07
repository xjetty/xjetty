import {Grid} from "@material-ui/core";
import EmailAddressFieldComponent from "../FieldComponents/EmailAddressFieldComponent";
import MessageFieldComponent from "../FieldComponents/MessageFieldComponent";
import React from "react";

const ContactFormComponent = () => {
    return (
        <>
            <Grid item xs={12}>
                <EmailAddressFieldComponent/>
            </Grid>
            <Grid item xs={12}>
                <MessageFieldComponent/>
            </Grid>
        </>
    )
}

export default ContactFormComponent