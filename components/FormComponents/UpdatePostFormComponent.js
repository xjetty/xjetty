import {Divider, Grid, Typography} from "@material-ui/core";
import DescriptionFieldComponent from "../FieldComponents/DescriptionFieldComponent";
import QuantityFieldComponent from "../FieldComponents/QuantityFieldComponent";
import SaleMethodFieldComponent from "../FieldComponents/SaleMethodFieldComponent";
import FixedAmountFieldComponent from "../FieldComponents/FixedAmountFieldComponent";
import UsdAmountFieldComponent from "../FieldComponents/UsdAmountFieldComponent";
import EosAmountFieldComponent from "../FieldComponents/EosAmountFieldComponent";
import MaximumPercentLessThanFieldComponent from "../FieldComponents/MaximumPercentLessThanFieldComponent";
import EosAccountNameFieldComponent from "../FieldComponents/EosAccountNameFieldComponent";
import AddMemoFieldComponent from "../FieldComponents/AddMemoFieldComponent";
import MemoFieldComponent from "../FieldComponents/MemoFieldComponent";
import React, {useContext} from "react";
import UpdatePostActionComponent from "../ActionComponents/UpdatePostActionComponent";
import {AppContext} from "../../contexts/AppContext";
import TitleFieldComponent from "../FieldComponents/TitleFieldComponent";
import ImageLinkPreviewComponent from "../ImageLinkPreviewComponent";
import KeywordsFieldComponent from "../FieldComponents/KeywordsFieldComponent";
import ModeFieldComponent from "../FieldComponents/ModeFieldComponent";
import PlatformsFieldComponent from "../FieldComponents/PlatformsFieldComponent";
import CategoryFieldComponent from "../FieldComponents/CategoryFieldComponent";
import SubcategoryFieldComponent from "../FieldComponents/SubcategoryFieldComponent";
import GetImageLinkButton from "../GetImageLinkButton";
import ImageLinkFieldComponent from "../FieldComponents/ImageLinkFieldComponent";

const UpdatePostFormComponent = (props) => {

    const {saleMethod, addMemo, imageLink} = useContext(AppContext)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <ModeFieldComponent/>
            </Grid>
            <Grid item xs={12} md={6}>
                <PlatformsFieldComponent/>
            </Grid>
            <Grid item xs={12} md={6}>
                <CategoryFieldComponent/>
            </Grid>
            <Grid item xs={12} md={6}>
                <SubcategoryFieldComponent/>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
            {!imageLink.trim() && (<Grid item xs={12}>
                <GetImageLinkButton/>
            </Grid>)}
            {imageLink.trim() && (<Grid item xs={12}>
                <ImageLinkPreviewComponent/>
            </Grid>)}
            <Grid item xs={12}>
                <ImageLinkFieldComponent/>
            </Grid>
            <Grid item xs={12}>
                <TitleFieldComponent/>
            </Grid>
            <Grid item xs={12}>
                <DescriptionFieldComponent/>
            </Grid>
            <Grid item xs={12}>
                <KeywordsFieldComponent/>
            </Grid>
            <Grid item xs={12}>
                <Divider/>
            </Grid>
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
                <Divider/>
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
    )
}

export default UpdatePostFormComponent