import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import CreateListingActionComponent from "../ActionComponents/CreateListingActionComponent";
import {makeStyles} from "@material-ui/core/styles";
import CreateUpdateListingFormComponent from "./CreateUpdateListingFormComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
    }
}))

const CreateListingFormComponent = () => {
    const classes = useStyles()
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardMedia
                        className={classes.media}
                        image='/logo.jpg'
                        title="BlockCommerc Logo"
                    />
                    <CardContent>
                        <Typography variant="h5">
                            Create a Listing
                        </Typography>
                        <Box my={2}>
                            <CreateUpdateListingFormComponent create={true}/>
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