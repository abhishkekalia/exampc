import { combineReducers } from 'redux';
import auth from './auth/auth.reducer';
import identity from './auth/identity.reducer';
import storage from './storage/storage.reducer';

export default rootReducer = combineReducers({
    auth,
    identity,
    storage
});