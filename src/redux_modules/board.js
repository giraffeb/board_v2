const UPDATE_ARTICLES = 'board/UPDATE_ARTICLES';

export const updateArticles = (list)=>({
    type: UPDATE_ARTICLES,
    payload:{
        article_list: list
    }
});

const initialSate = {
    article_list: Array(),
    article_cnt: 0,
    call_cnt: 0
};

const board = (state = initialSate, action)=>{

    switch(action.type){
        case UPDATE_ARTICLES:
            console.log("UPDATE ARTICLES CATCH!", state);
            state.article_list = action.payload.article_list;
            state.call_cnt += 1
            
            return state
        
        default:
            return state;

    }
}


export default board;