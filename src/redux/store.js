import { combineReducers, configureStore } from '@reduxjs/toolkit'
import persistReducer from 'redux-persist/es/persistReducer'
import userReducer from './user/userSlice'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore'

const rootReducer = combineReducers({user : userReducer})
const persistConfig = {
    key: 'root',
    version : 1,
    storage,
}
const presistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer :presistedReducer,
    middleware : (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck : false
    }),
})

export const persistor = persistStore(store)
