import Head from "next/head";
import React from 'react'
import {
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Chip, Divider,
    Grid,
    LinearProgress,
    MuiThemeProvider,
    Typography
} from "@material-ui/core";
import {createTheme, makeStyles} from "@material-ui/core/styles";
import {useContext, useEffect, useMemo} from "react";
import {AppContext} from "../contexts/AppContext";
import SearchFieldComponent from "../components/FieldComponents/SearchFieldComponent";
import axios from "axios";
import {red} from "@material-ui/core/colors";
import UpdateEosRate from "../components/UpdateEosRate";
import {GpsFixed, GpsNotFixed, EmojiPeople} from '@material-ui/icons'
import Masonry from 'react-masonry-css'
import {Pagination} from "@material-ui/lab";
import ModeFieldComponent from "../components/FieldComponents/ModeFieldComponent";
import PlatformsFieldComponent from "../components/FieldComponents/PlatformsFieldComponent";
import CategoryFieldComponent from "../components/FieldComponents/CategoryFieldComponent";
import SubcategoryFieldComponent from "../components/FieldComponents/SubcategoryFieldComponent";
import ModesFieldComponent from "../components/FieldComponents/ModesFieldComponent";
import Platforms2FieldComponent from "../components/FieldComponents/Platforms2FieldComponent";
import CategoriesFieldComponent from "../components/FieldComponents/CategoriesFieldComponent";

const useStyles = makeStyles((theme) => ({
    media: {
        height: theme.spacing(25),
        backgroundSize: 'contain'
    },
    postMedia: {
        height: theme.spacing(30),
        backgroundSize: 'contain'
    },
    chip: {
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    masonryGrid: {
        display: "flex",
        marginLeft: '-16px',
        width: 'auto',
        marginBottom: '-16px'
    },
    masonryGridColumn: {
        paddingLeft: '16px',
        backgroundClip: 'padding-box'
    }
}))

const breakpointColumnsObj = {
    default: 3,
    1280: 3,
    960: 2,
    600: 1
}

const usdFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
})

const eosFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 4,
    maximumFractionDigits: 4
})

const redTheme = createTheme({palette: {primary: red}})

const Posts = () => {
    const classes = useStyles()
    const {
        search,
        eosRate,
    } = useContext(AppContext)
    const [posts, setPosts] = React.useState([])
    const [page, setPage] = React.useState(1)
    const [applied, setApplied] = React.useState(true)
    const [pageLength, setPageLength] = React.useState(1)
    const [submittingData, setSubmittingData] = React.useState(false)

    const getPosts = async (applied, search, page) => {
        try {
            const res = await axios.post('api/getPosts', {
                applied: applied,
                search: search,
                page: page
            })
            const data = res.data
            if (data.success) {
                setPosts(data.posts)
                setPageLength(data.pageLength)
            } else if (data && data.alertMessage) {
                alert(data.alertMessage)
            } else
                alert('Something went wrong')
        } catch (e) {
            alert('Lost Internet connection')
        }
        setSubmittingData(false)
    }

    const submitData = () => {
        setSubmittingData(true)
        setPosts([])
        setApplied(true)
        getPosts(applied, search, page)
    }

    const disabled = useMemo(() => {
        return submittingData
    }, [submittingData])

    const updateAmount = (post) => {
        let returnThis = {}
        if (post.fixedAmount === 'usd') {
            const fixedAmount = `${usdFormatter.format(post.usdAmount)} USD`
            const notFixedAmount = `${eosFormatter.format(post.usdAmount / eosRate).replace('$', '')} EOS`
            returnThis = {fixedAmount: fixedAmount, notFixedAmount: notFixedAmount}
        } else {
            const fixedAmount = `${eosFormatter.format(post.eosAmount).replace('$', '')} EOS`
            const notFixedAmount = `${usdFormatter.format(post.eosAmount * eosRate)} USD`
            returnThis = {fixedAmount: fixedAmount, notFixedAmount: notFixedAmount}
        }
        return returnThis
    }

    const changePage = (event, value) => {
        setSubmittingData(true)
        setPosts([])
        setApplied(false)
        setPage(value)
        getPosts(applied, search, page)
    }

    return (
        <html>
        <Head>
            <title>Public Listings - BlockCommerc</title>
        </Head>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Card variant="outlined">
                    <CardMedia
                        className={classes.media}
                        image='/logo.png'
                        title="D2R Crypto Logo"
                    />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <ModesFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Platforms2FieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <CategoriesFieldComponent/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SubcategoryFieldComponent/>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider/>
                            </Grid>
                            <Grid item xs={12}>
                                <SearchFieldComponent/>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container spacing={2}>
                            {submittingData && (<Grid item xs={12}>
                                <LinearProgress/>
                            </Grid>)}
                            <Grid item xs={12}>
                                <Button onClick={submitData} disabled={disabled} variant="contained"
                                        color="primary">Apply</Button>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            </Grid>
            <Grid item xs={12}>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className={classes.masonryGrid}
                    columnClassName={classes.masonryGridColumn}
                >
                    {posts.map((post, index) => (
                        <Card key={index} style={{marginBottom: '16px'}}>
                            {post.imageLink && (<CardMedia
                                className={classes.postMedia}
                                image={post.imageLink}
                            />)}
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Typography>
                                            {post.title}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <div className={classes.chip} key={eosRate}>
                                            {post.saleMethod !== 'offersOnly' && (<><Chip
                                                label={updateAmount(post).fixedAmount}
                                                icon={<GpsFixed/>}/>
                                                <Chip label={updateAmount(post).notFixedAmount}
                                                      icon={<GpsNotFixed/>}/></>)}
                                            {post.saleMethod !== 'askingPriceOnly' && (
                                                <MuiThemeProvider theme={redTheme}><Chip label="Accepting offers"
                                                                                         icon={<EmojiPeople/>}
                                                                                         color="primary"/></MuiThemeProvider>)}
                                        </div>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <CardActions>
                                <Button href={`/post/${post.code}`} target="_blank" variant="contained"
                                        color="primary">Go to post</Button>
                            </CardActions>
                        </Card>
                    ))}
                </Masonry>
            </Grid>
            {posts.length > 0 && (<Grid item xs={12} container justifyContent="center">
                <Pagination color="primary" count={pageLength} page={page} onChange={changePage}/>
            </Grid>)}
        </Grid>
        <UpdateEosRate/>
        </html>
    )
}

export default Posts