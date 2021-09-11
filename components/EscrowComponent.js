import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from "@material-ui/core";
import React from "react";
import EscrowActionComponent from "./ActionComponents/EscrowActionComponent";
import EscrowDetailsComponent from "./EscrowDetailsComponent";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0
    }
}))

const EscrowComponent = (props) => {
    const classes = useStyles()
    return (
        <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Escrow actions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EscrowActionComponent user={props.user} token={props.token}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>Escrow details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EscrowDetailsComponent/>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default EscrowComponent