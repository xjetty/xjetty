import {AppBar, IconButton, makeStyles, Toolbar, Typography} from "@material-ui/core";
import HomeIcon from "@material-ui/icons/Home"
import Link from 'next/link'

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1
    }
}))

const NavBarComponent = () => {
    const classes = useStyles()
    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h6" className={classes.title}>
                    D2R Crypto
                </Typography>
                <Link href="/">
                    <IconButton color="inherit">
                        <HomeIcon/>
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    )

}

export default NavBarComponent