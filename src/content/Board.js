import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/Inbox';

import {useSelector, useDispatch} from 'react-redux';
import {UPDATE_ARTICLES, updateArticles} from '../redux_modules/board';



function Board(){
    const [count, setCount] = useState(Array(10).fill(''));
    const dispatch = useDispatch();
    const board = useSelector(state => state.board, []);

    useEffect(()=>{
        getLists();
    },[]);
    
    const getLists = ()=>{
        console.log("GET LISTS CALL ", board);

        fetch("http://localhost:8090/post/list")
        .then((response)=>{
            response.json()
            .then((json)=>{
                console.log("board list ->",json);
                dispatch(updateArticles(json));
            })
        });

        
    }
    
    const posts_list = ()=>{

        return board.article_list.map((v, i)=>(
            <ListItem button key={i}>
                {/* <ListItemIcon>
                    <InboxIcon></InboxIcon>
                </ListItemIcon> */}
                <ListItemText primary={v.title} secondary={<Typography> {v.cnt}</Typography>}/>
            </ListItem> 
        ))
    };
    
    

    return (
        <List>
            { posts_list() }
        </List>
        )
    
}

export default Board;