import {Card, CardActions, CardContent, Grid, Typography} from "@material-ui/core";
import MessageFieldComponent from "../FieldComponents/MessageFieldComponent";
import PostMessageActionComponent from "../ActionComponents/PostMessageActionComponent";

const PostMessageFormComponent = (props) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h5" component="h2">
                                Post a Message
                            </Typography>
                            <Typography color="textSecondary">
                                {props.subtitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <MessageFieldComponent/>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <PostMessageActionComponent token={props.token}/>
                </CardActions>
            </Card>
        </>
    )
}

export default PostMessageFormComponent