import React, {useContext, useMemo} from 'react'
import {makeStyles} from '@material-ui/core/styles'
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem'
import ImageListItemBar from '@material-ui/core/ImageListItemBar'
import IconButton from '@material-ui/core/IconButton'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import {Remove} from '@material-ui/icons'
import {AppContext} from "../../contexts/AppContext"
import {Grid} from "@material-ui/core"
import Image from 'next/image'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        flexWrap: 'nowrap',
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}))

export default function ImageLinkPreview() {
    const {inputList} = useContext(AppContext)
    const classes = useStyles()

    const show = useMemo(() => {
        let show = false
        inputList.every(value => {
            if (value.trim()) {
                show = true
                return false
            } else
                return true
        })
        return show
    }, [inputList])

    if (show) {
        return (
            <Grid item xs={12}>
                <div className={classes.root}>
                    <ImageList className={classes.imageList} cols={2.5}>
                        {inputList.map((item, index) => {
                            if (item.trim()) {
                                return (
                                    <ImageListItem key={index}>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item} alt="Image preview"/>
                                        <ImageListItemBar
                                            title={`Image ${index + 1}`}
                                            classes={{
                                                root: classes.titleBar,
                                                title: classes.title,
                                            }}
                                            actionIcon={
                                                <IconButton>
                                                    <Remove className={classes.title}/>
                                                </IconButton>
                                            }
                                        />
                                    </ImageListItem>
                                )
                            } else
                                return ''
                        })}
                    </ImageList>
                </div>
            </Grid>
        )
    } else
        return ''
}
