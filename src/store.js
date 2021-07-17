import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer
})

const cartItemsFromStore = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []


const initialState = {
    cart: {cartItems: cartItemsFromStore}
}


const midlleware = [thunk]
const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...midlleware))
    )



export default store