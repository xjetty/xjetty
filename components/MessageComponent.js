import {Card, CardContent, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    pos: {
        marginBottom: 12
    }
})

const MessageComponent = (props) => {
    const classes = useStyles()
    return (
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {props.user}
                </Typography>
                <Typography className={classes.pos}>
                    {props.datetime}
                </Typography>
                <Typography variant="body1" component="p">
                    {props.message}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MessageComponent