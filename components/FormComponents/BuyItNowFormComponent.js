import {Card, CardActions, CardContent, Grid} from '@material-ui/core'
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

const BuyItNowFormComponent = () => {
    const {eosAccount, addMemo} = useContext(AppContext)
    return (
        <Card>
            <CardContent>
                <Grid container spacing={2}>
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
                        <CommentsFieldComponent/>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <EmailAddressFieldComponent/>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <BuyItNowActionComponent/>
            </CardActions>
        </Card>
    )
}

export default BuyItNowFormComponent
