import React, {ReactFragment, useState} from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, IconButton, Paper, Grid, Button, Typography, Container} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Article from './content/Article';
import Login from './auth_component/SignIn';
import {Router, Route} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout, setLogin } from './redux_modules/auth';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    
    color: theme.palette.text.secondary,
  },
  article: {
    margin: 'auto',
    minWidth: '800px',

  }
}));

function App() {

  const classes = useStyles();
  const isJwt = sessionStorage.getItem("jwt");
  const isLogin = useSelector(state=> state.author);
  const dispatch = useDispatch();

  const toggle = ()=>{
    if(isLogin === true){
      sessionStorage.removeItem("jwt");
      dispatch(setLogout())
      
    }
  }

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Hello new world
          </Typography>
          <Button color="inherit" onClick={toggle}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container className={classes.article}>
        <Article></Article>
      </Container>
    </React.Fragment>   
  );
  
}

export default App;
