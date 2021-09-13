import {Grid} from '@material-ui/core'
import UsdAmountFieldComponent from '../FieldComponents/UsdAmountFieldComponent'
import EosAmountFieldComponent from '../FieldComponents/EosAmountFieldComponent'
import EmailAddressFieldComponent from '../FieldComponents/EmailAddressFieldComponent'
import React from 'react'
import MakeOfferActionComponent from "../ActionComponents/MakeOfferActionComponent";

const MakeOfferFormComponent = ({code}) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <UsdAmountFieldComponent/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EosAmountFieldComponent/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EmailAddressFieldComponent/>
                </Grid>
                <Grid item xs={12}>
                    <MakeOfferActionComponent code={code}/>
                </Grid>
            </Grid>
        </>
    )
}

export default MakeOfferFormComponent
