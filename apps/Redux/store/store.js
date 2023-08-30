
import { applyMiddleware, createStore } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/reducers';

let store = createStore(rootReducer, applyMiddleware(thunk))
let persistor = persistStore(store)
export { store, persistor }