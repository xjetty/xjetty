import {Box, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@material-ui/core";
import CreatePostActionComponent from "../ActionComponents/CreatePostActionComponent";
import {makeStyles} from "@material-ui/core/styles";
import CreateUpdateFormPostComponent from "./CreateUpdateFormPostComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
    }
}))

const CreatePostFormComponent = () => {
    const classes = useStyles()
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardMedia
                        className={classes.media}
                        image='/logo.png'
                        title="D2R Crypto Logo"
                    />
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Create a Post
                        </Typography>
                        <Box my={2}>
                            <CreateUpdateFormPostComponent create={true}/>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <CreatePostActionComponent/>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}
export default CreatePostFormComponent