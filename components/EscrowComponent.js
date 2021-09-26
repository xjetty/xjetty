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

const EscrowComponent = (props) => {
    return (
        <>
            <Accordion defaultExpanded={true}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Escrow actions</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EscrowActionComponent user={props.user} token={props.token}/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}>
                    <Typography>Escrow details</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <EscrowDetailsComponent/>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export default EscrowComponent