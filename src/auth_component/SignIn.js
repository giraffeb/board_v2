import React, {ReactFragment} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AuthAlert from './AuthAlert'

import { useDispatch, useSelector } from 'react-redux';
import { setLogin, SET_LOGIN } from '../redux_modules/auth';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {

  const isLogin = useSelector(author => author.state);
  // const isLogin ="Hello";
  const dispatch = useDispatch();
  
  const classes = useStyles();
  
  //TODO: 비동기로 서버에 로그인을 요청합니다.
  //TODO: 게시판 서버와 연동하도록 수정해야힘
  const submitLogin = (event)=>{
    event.preventDefault();
    console.log("submit event->", event);
    let login_form = document.getElementById("login_form");
    let f = new FormData(login_form);

    var object = {};
    f.forEach(function(value, key){
        object[key] = value;
    });

    object.userId = object.email;
    var json = JSON.stringify(object);
    console.log("json->", json);

    fetch('http://localhost:8080/auth/signin', {
      method: "POST",
      body: JSON.stringify(object),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>{
        console.log('response->', response);
        response.json()
        .then((responseJson)=>{
          console.log(responseJson);
          if ( responseJson.status === "success"){
            sessionStorage.setItem('jwt', responseJson.jwt);            
            dispatch(setLogin());

          } else if(responseJson.status === "failed") {
            console.log("Failed Catch!");
            handleClickOpen();
          }
          
        })
    })
  }

  //
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <Container component="main" maxWidth="xs">
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"로그인을 실패했습니다."}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              아이디와 패스워드를 확인해주시기 바랍니다.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              확인
            </Button>
          </DialogActions>
        </Dialog>
      </div>


      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitLogin} id="login_form">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

