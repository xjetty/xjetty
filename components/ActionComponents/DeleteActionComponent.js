import {Button, MuiThemeProvider} from "@material-ui/core";
import {red} from "@material-ui/core/colors";
import {createTheme} from "@material-ui/core/styles";

const redTheme = createTheme({palette: {primary: red}})

const DeleteActionComponent = (props) => {
    return (
        <MuiThemeProvider theme={redTheme}>
            <Button
                variant="contained" color="primary">
                Delete post
            </Button>
        </MuiThemeProvider>
    )
}

export default DeleteActionComponent