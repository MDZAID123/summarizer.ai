import { configureStore } from '@reduxjs/toolkit';

import { articleApi } from './article';
//store is the global state of our applications
//but in most cases we dont want the entire thing to go

export const store =configureStore({
    reducer:{
        [articleApi.reducerPath]:articleApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware().concat(articleApi.middleware)
});