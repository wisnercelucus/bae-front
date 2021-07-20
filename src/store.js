import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import {productListReducer, productDetailsReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer, userDetailsReducer, userUpdateProfileReducer } from './reducers/userReducers'

const reducer = combineReducers({
    productList:productListReducer,
    productDetails:productDetailsReducer,
    cart: cartReducer,
    userLogin:userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
})

const cartItemsFromStore = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStore = localStorage.getItem('userInfo') ? 
    JSON.parse(localStorage.getItem('userInfo')) : null

const initialState = {
    cart: {cartItems: cartItemsFromStore},
    userLogin: {userInfo: userInfoFromStore}
}

const midlleware = [thunk]
const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...midlleware))
    )



export default store