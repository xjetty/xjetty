import {AppBar, Card, CardContent, Tab} from "@material-ui/core";
import React, {useContext} from "react";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import EscrowActionComponent from "./ActionComponents/EscrowActionComponent";
import EscrowDetailsComponent from "./EscrowDetailsComponent";
import {AppContext} from "../contexts/AppContext";

const EscrowComponent = (props) => {
    const [tabValue, setTabValue] = React.useState('1')
    const {escrowDetails} = useContext(AppContext)
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }
    return (
        <>
            {(props.user === 'buyer' && (!escrowDetails.disputeOpened && !escrowDetails.escrowReleased && !escrowDetails.escrowRefunded)) || (escrowDetails.user === 'buyer' && (escrowDetails.disputeOpened && !escrowDetails.escrowReleased && !escrowDetails.escrowRefunded)) || (props.user === 'seller' && (!escrowDetails.escrowRefunded && !escrowDetails.escrowReleased)) ? (
                <TabContext value={tabValue}>
                    <AppBar position="static">
                        <TabList onChange={handleTabChange}>
                            <Tab label="Escrow actions" value="1"/>
                            <Tab label="Escrow details" value="2"/>
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <EscrowActionComponent user={props.user} token={props.token}/>
                    </TabPanel>
                    <TabPanel value="2">
                        <EscrowDetailsComponent/>
                    </TabPanel>
                </TabContext>) : (
                <TabContext value={tabValue}>
                    <AppBar position="static">
                        <TabList onChange={handleTabChange}>
                            <Tab label="Escrow details" value="1"/>
                        </TabList>
                    </AppBar>
                    <TabPanel value="1">
                        <EscrowDetailsComponent/>
                    </TabPanel>
                </TabContext>
            )}
        </>
    )
}

export default EscrowComponent