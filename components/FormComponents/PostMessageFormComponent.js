import {Card, CardActions, CardContent, Grid} from "@material-ui/core";
import MessageFieldComponent from "../FieldComponents/MessageFieldComponent";
import PostMessageActionComponent from "../ActionComponents/PostMessageActionComponent";

const PostMessageFormComponent = (props) => {
    return (
        <>
            <Card>
                <CardContent>
                    <Grid container spacing={2}>
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