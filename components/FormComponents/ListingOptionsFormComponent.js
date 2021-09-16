import {Grid} from "@material-ui/core";
import React from "react";
import HiddenActionComponent from "../ActionComponents/HiddenActionComponent";
import DeleteActionComponent from "../ActionComponents/DeleteActionComponent";

const ListingOptionsFormComponent = (props) => {
    return (
       <>
           <Grid container spacing={2}>
               <Grid item xs={12}>
                   <HiddenActionComponent token={props.token}/>
               </Grid>
               <Grid item xs={12}>
                   <DeleteActionComponent token={props.token}/>
               </Grid>
           </Grid>
       </>
    )
}

export default ListingOptionsFormComponent