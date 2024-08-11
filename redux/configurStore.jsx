import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Auth } from './reducers/auth';
import { User } from './reducers/user';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: User,
            auth: Auth,
           
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}