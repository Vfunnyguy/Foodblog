import { combineReducers } from 'redux'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import categoryReducer from './categoryReducer'
import blogsReducer from './blogReducer'
import blogsCategoryReducer from './blogCategoryReducer'
import otherInfoReducer from './ortherInfoReducer'
import blogsUserReducer from './blogUserReducer'
import commentReducer from './commentReducer'
import socketReducer from './socketReducer'
export default combineReducers({
  
    authReducer,
    alertReducer,
    categoryReducer,
    blogsReducer,
    blogsCategoryReducer,
    otherInfoReducer,
    blogsUserReducer,
    commentReducer,
    socketReducer
})