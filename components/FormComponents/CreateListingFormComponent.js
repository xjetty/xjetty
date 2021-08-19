import {useContext} from "react";
import {AppContext} from "../../contexts/AppContext";
import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
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
import EmailAddressFieldComponent from "../FieldComponents/EmailAddressFieldComponent";
import CreateListingActionComponent from "../ActionComponents/CreateListingActionComponent";
import {makeStyles} from "@material-ui/core/styles";
import PublicListingFieldComponent from "../FieldComponents/PublicListingFieldComponent";
import DisplayImageLinkFieldComponent from "../FieldComponents/DisplayImageLinkFieldComponent";

const useStyles = makeStyles({
    media: {
        height: 100,
        backgroundSize: 'contain',
        width: 'inherit',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
})

const CreateListingFormComponent = () => {
    const classes = useStyles()
    const {saleMethod, addMemo, publicListing} = useContext(AppContext)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardMedia
                        className={classes.media}
                        image='/logo.jpg'
                        title="BlockCommerc Logo"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Create a Listing
                        </Typography>
                        <Typography color="textSecondary">
                            Be a Merchant on the Blockchain
                        </Typography>
                        <Box my={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <NotesFieldComponent/>
                                </Grid>
                                <Grid item xs={12}>
                                    <PublicListingFieldComponent/>
                                </Grid>
                                {publicListing && (<Grid item xs={12}>
                                    <DisplayImageLinkFieldComponent/>
                                </Grid>)}
                                <Grid item xs={12}>
                                    <Typography gutterBottom>
                                        Quantity
                                    </Typography>
                                    <Box mt={4}>
                                        <QuantityFieldComponent/>
                                    </Box>
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
                                        <Box mt={4}>
                                            <MaximumPercentLessThanFieldComponent/>
                                        </Box>
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
                                <Grid item xs={12} md={6}>
                                    <EmailAddressFieldComponent/>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <CreateListingActionComponent/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default CreateListingFormComponent