import React from 'react';
import { BrowserRouter, Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import App from './App';
import SignIn from './auth_component/SignIn';
import SignUp from './auth_component/SignUp';
import { useSelector, useDispatch } from 'react-redux';
import { setLogin, setLogout } from './redux_modules/auth';
import NotFound from './notfound/NotFound'


const Root = () => {
    
    const isLoginState = useSelector(state => state.author);
    const dispatch = useDispatch();

    const isLogin = ()=>{
            let flag = false;
            let jwt = sessionStorage.getItem("jwt");

            if(jwt !== null){

                dispatch(setLogin());
                flag = true; 
            }else{
                dispatch(setLogout());   
            }
            console.log("isLoginState ->", isLoginState);
            console.log("flag->", flag);

            return flag;
        }

    return (
        
        <BrowserRouter>
            <Route exact path="/">
                {
                    isLogin() ? <App></App> : <Redirect to="/signin"></Redirect>
                }
            </Route>
            <Route exact path="/signin">
                {
                    isLogin() ? <Redirect to="/"></Redirect> : <SignIn></SignIn>
                }
            </Route>
            <Route exact path="/signup">
                {
                    isLogin() ? <Redirect to="/"></Redirect> : <SignUp></SignUp>
                }
            </Route>
            <Route path="*">
                {
                    isLogin() ? <Redirect to="/"></Redirect> : <Redirect to="/signin"></Redirect>
                }
            </Route>

        </BrowserRouter>

    ) 
};


export default Root;