import { createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import temporadasReducer from './reducers'

const rootReducer = combineReducers({temporadasReducer})

export const Store = createStore(rootReducer, applyMiddleware(thunk));
