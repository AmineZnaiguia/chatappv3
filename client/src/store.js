import {createStore, compose, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import combineReducers from './reducers';



const middleWare = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
 
};
const store = createStore(
    combineReducers,
  initialState,
  composeEnhancers(applyMiddleware(...middleWare))
);
export default store;