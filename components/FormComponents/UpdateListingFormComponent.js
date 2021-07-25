import {Box, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import NotesFieldComponent from "../FieldComponents/NotesFieldComponent";
import QuantityFieldComponent from "../FieldComponents/QuantityFieldComponent";
import SaleMethodFieldComponent from "../FieldComponents/SaleMethodFieldComponent";
import FixedAmountFieldComponent from "../FieldComponents/FixedAmountFieldComponent";
import UsdAmountFieldComponent from "../FieldComponents/UsdAmountFieldComponent";
import EosAmountFieldComponent from "../FieldComponents/EosAmountFieldComponent";
import MaximumPercentLessThanFieldComponent from "../FieldComponents/MaximumPercentLessThanFieldComponent";
import UseEscrowFieldComponent from "../FieldComponents/UseEscrowFieldComponent";
import EosAccountNameFieldComponent from "../FieldComponents/EosAccountNameFieldComponent";
import AddMemoFieldComponent from "../FieldComponents/AddMemoFieldComponent";
import MemoFieldComponent from "../FieldComponents/MemoFieldComponent";
import React, {useContext} from "react";
import UpdateListingActionComponent from "../ActionComponents/UpdateListingActionComponent";
import {AppContext} from "../../contexts/AppContext";

const UpdateListingFormComponent = () => {

    const {saleMethod, addMemo} = useContext(AppContext)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <NotesFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography gutterBottom>
                                    Quantity
                                </Typography>
                                <QuantityFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <SaleMethodFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <FixedAmountFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <UsdAmountFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <EosAmountFieldComponent/>
                            </Grid>
                            {saleMethod === 'askingPriceAndOffers' && (
                                <Grid item xs={12}>
                                    <Typography gutterBottom>
                                        Maximum percent less than
                                    </Typography>
                                    <MaximumPercentLessThanFieldComponent/>
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <UseEscrowFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <EosAccountNameFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <AddMemoFieldComponent/>
                            </Grid>
                            {addMemo && (
                                <Grid item xs={12}>
                                    <MemoFieldComponent/>
                                </Grid>
                            )}
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <UpdateListingActionComponent/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default UpdateListingFormComponent