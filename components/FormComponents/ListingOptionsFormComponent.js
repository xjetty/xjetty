import {Box, Card, CardContent, Grid, Typography} from "@material-ui/core";
import GenerateNewCodeActionComponent from "../ActionComponents/GenerateNewCodeActionComponent";
import React from "react";
import HiddenActionComponent from "../ActionComponents/HiddenActionComponent";
import DeleteActionComponent from "../ActionComponents/DeleteActionComponent";

const ListingOptionsFormComponent = () => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Listing Options
                        </Typography>
                        <Box my={2}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <GenerateNewCodeActionComponent/>
                                </Grid>
                                <Grid item xs={12}>
                                    <HiddenActionComponent/>
                                </Grid>
                                <Grid item xs={12}>
                                    <DeleteActionComponent/>
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ListingOptionsFormComponent