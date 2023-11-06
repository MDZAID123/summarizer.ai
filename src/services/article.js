// this is one specific part of our global state
import {  createApi ,fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const rapidApiKey=import.meta.env.VITE_RAPID_API_ARTICLE_KEY;
//before we set up our first route  we need to set up something called as  base

// const options = {
//     method: 'GET',
//     url: 'https://article-extractor-and-summarizer.p.rapidapi.com/summarize',
//     params: {
//       url: 'https://time.com/6266679/musk-ai-open-letter/',
//       length: '3',
//       lang: 'en'
//     },
//     headers: {
//       'X-RapidAPI-Key': '825f4bff44msh27a895ee4f2c760p15f8e3jsn6b5e42c725ac',
//       'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
//     }
//   };
  
// after setting the base query we need to up the endpoints
//we need to set up the optional and required parameters by passing them as arguments in the url 
//for correct api call hit 
export const articleApi=createApi(

    {
        reducerPath:'articleApi',
        baseQuery:fetchBaseQuery({
            baseUrl:'https://article-extractor-and-summarizer.p.rapidapi.com/',
            prepareHeaders:(headers)=>{
                headers.set('X-RapidAPI-Key',rapidApiKey);
                headers.set('X-RapidAPI-Host','article-extractor-and-summarizer.p.rapidapi.com');
                return headers;
            }
        }),
        endpoints:(builder)=>({
            getSummary:builder.query({
                query:(params)=> `/summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`
            })
        })
    }
);

// the error on the console means that our article.js still missed the api endpoints to hit
//redux toolkit automatically creates a hook out of this endpoint
//using the useLazyGetSummaryQuery allows us to fire the associated hook on demand
export const { useLazyGetSummaryQuery }=articleApi;
//in the above export statement we are exploring that statement