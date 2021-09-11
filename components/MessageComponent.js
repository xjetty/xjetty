import {Card, CardContent, Divider, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import React from "react";

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
                <Typography variant="h5">
                    {props.user}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    {props.datetime}
                </Typography>
                <Typography variant="body1">
                    <span dangerouslySetInnerHTML={{__html: props.message.replace(/\n/g, '<br />')}}/>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default MessageComponent