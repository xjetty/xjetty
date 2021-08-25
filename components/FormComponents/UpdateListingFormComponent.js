import {Box, Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import DescriptionFieldComponent from "../FieldComponents/DescriptionFieldComponent";
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
import TitleFieldComponent from "../FieldComponents/TitleFieldComponent";
import ImageLinkPreviewComponent from "../ImageLinkPreviewComponent";
import ImageLinksFieldComponent from "../FieldComponents/ImageLinksFieldComponent";
import PublicListingFieldComponent from "../FieldComponents/PublicListingFieldComponent";
import KeywordsFieldComponent from "../FieldComponents/KeywordsFieldComponent";
import WorldwideFieldComponent from "../FieldComponents/WorldwideFieldComponent";
import CountriesFieldComponent from "../FieldComponents/CountriesFieldComponent";

const UpdateListingFormComponent = () => {

    const {saleMethod, addMemo, publicListing, worldwide} = useContext(AppContext)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TitleFieldComponent/>
                            </Grid>
                            <ImageLinkPreviewComponent/>
                            <ImageLinksFieldComponent/>
                            <Grid item xs={12}>
                                <DescriptionFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <PublicListingFieldComponent/>
                            </Grid>
                            {publicListing && (
                                <>
                                    <Grid item xs={12}>
                                        <KeywordsFieldComponent/>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <WorldwideFieldComponent/>
                                    </Grid>
                                    {!worldwide && (<Grid item xs={12}>
                                        <CountriesFieldComponent/>
                                    </Grid>)}
                                </>
                            )}
                            <Grid item xs={12}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <Typography gutterBottom>
                                            Quantity
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <QuantityFieldComponent/>
                                    </Grid>
                                </Grid>
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
                                    <Grid container spacing={4}>
                                        <Grid item xs={12}>
                                            <Typography gutterBottom>
                                                Maximum percent less than
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <MaximumPercentLessThanFieldComponent/>
                                        </Grid>
                                    </Grid>
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