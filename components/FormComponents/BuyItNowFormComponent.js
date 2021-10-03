import {Button, Divider, Grid, MuiThemeProvider} from '@material-ui/core'
import EosAccountNameFieldComponent from '../FieldComponents/EosAccountNameFieldComponent'
import AssociativePrivateKeyFieldComponent from '../FieldComponents/AssociativePrivateKeyFieldComponent'
import CommentsFieldComponent from '../FieldComponents/CommentsFieldComponent'
import EmailAddressFieldComponent from '../FieldComponents/EmailAddressFieldComponent'
import React, {useContext} from 'react'
import BuyItNowActionComponent from '../ActionComponents/BuyItNowActionComponent'
import MemoFieldComponent from "../FieldComponents/MemoFieldComponent";
import {AppContext} from "../../contexts/AppContext";
import EosAccountFieldComponent from "../FieldComponents/EosAccountFieldComponent";
import AddMemoFieldComponent from "../FieldComponents/AddMemoFieldComponent";
import {OpenInNew} from "@material-ui/icons";
import ClearEosAccountStorageComponent from "../ClearEosAccountStorageComponent";
import {createTheme} from "@material-ui/core/styles";
import {yellow} from "@material-ui/core/colors";
import QuantityRequestedFieldComponent from "../FieldComponents/QuantityRequestedFieldComponent";

const yellowTheme = createTheme({palette: {primary: yellow}})

const BuyItNowFormComponent = ({token, code}) => {
    const {eosAccount, addMemo} = useContext(AppContext)
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <MuiThemeProvider theme={yellowTheme}>
                        <Button disableElevation variant="contained" color="primary" href="https://eospowerup.io/free" target="_blank" endIcon={<OpenInNew/>}>
                            EOS powerup
                        </Button>
                    </MuiThemeProvider>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EosAccountFieldComponent/>
                </Grid>
                {eosAccount === 'New' && (
                    <>
                        <Grid item xs={12} md={6}>
                            <EosAccountNameFieldComponent/>
                        </Grid>
                        <Grid item xs={12}>
                            <AssociativePrivateKeyFieldComponent/>
                        </Grid>
                        <Grid item xs={12}>
                            <AddMemoFieldComponent/>
                        </Grid>
                        {addMemo && (
                            <Grid item xs={12}>
                                <MemoFieldComponent/>
                            </Grid>
                        )}
                    </>
                )}
                <Grid item xs={12}>
                    <ClearEosAccountStorageComponent/>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <QuantityRequestedFieldComponent/>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid item xs={12}>
                    <CommentsFieldComponent/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <EmailAddressFieldComponent/>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <BuyItNowActionComponent code={code} token={token}/>
            </Grid>
        </>
    )
}

export default BuyItNowFormComponent
