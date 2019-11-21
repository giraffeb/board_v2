import React from 'react';
import ReactDom from 'react-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Board from './Board';

const useStyles = makeStyles(theme => ({
    root:{
        // padding: theme.spacing(3,2),
    },

}));

function Article(){

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
             <Typography variant="h5" component="h3">
                 Hello new world
             </Typography>
             <Typography component="p">
                whole new world. a fantastic point of view
            </Typography>
            <Board></Board>
        </Paper>
    )

}

export default Article;