import {PRODUCT_LIST_FAIL, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_REQUEST} from '../constants/productConstants'

import axios from 'axios'

const listProducts = () => async (dispatch) =>{
    try{
        dispatch({type:PRODUCT_LIST_REQUEST})  
        const { data } = await axios.get('/api/products/')
        dispatch({type:PRODUCT_LIST_SUCCESS, payload:data}) 
    }catch(err){
        dispatch({
            type:PRODUCT_LIST_FAIL, payload:err.response && err.response.data.message
            ?  err.response.data.message : err.message
        })
    }
}