import { configureStore } from '@reduxjs/toolkit'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { persistStore, persistReducer } from 'redux-persist';
import userReducer from '../Reducer/index'


export const store = configureStore({
    reducer: {
      user: userReducer,
      
    },
})