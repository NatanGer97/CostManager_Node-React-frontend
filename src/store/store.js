import { configureStore } from '@reduxjs/toolkit'
import { costsReducer } from './costsSlice';

const store = configureStore({
    reducer: {
        costs:  costsReducer,
    }


}); 


export default store;