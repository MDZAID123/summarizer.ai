import React from 'react'

//this is where the rest of the magic will happen 

//first import the nessary hooks from the react to be used her e
import { useState ,useEffect} from 'react';
//now we will be importing some of the  required icons to be used on our websites

//here we will import that hook for the api calls
import { useLazyGetSummaryQuery } from '../services/article';


import { copy,linkIcon,loader,tick} from '../assets';

const Demo = () => {

    const [article,setArticle]=useState({

        url:'',
        summary:'',
    });



    // for storing all the articles we will be using usestate 
    const [allArticles,setAllArticles]=useState([]);


    const [getSummary,{ error,isFetching}]=useLazyGetSummaryQuery();

    //since the above hook is a  lazyhook the thing in the box is the function which will execute it
    const [copied,setCopied]=useState("");
    useEffect(()=>{


        const articlesFromLocalStorage=JSON.parse(
            localStorage.getItem('articles')

        )

        if(articlesFromLocalStorage){
            setAllArticles(articlesFromLocalStorage);
            //now this code part is only going to add the article if there are in the local storage to our 
            //state

        }

    },[]);
    //WE PASSED AN EMPTY DEPENDENCY ARRAY TO THE ABOVE USEEFFECT SINCE WE WANT IT TO BE EXECUTED 
    //AT THE BEGINNING LOADING OF OUR APPLICtion

    // below we will be defining a custom function from which we will be doing an api request
    //we will be making the below function as an asynchorunous one

    const handleSubmit= async (e)=>{

        //After every submission their happens a default reloading we need to prevent that 
        //to get things in state lost 
        e.preventDefault();



        const { data }=await getSummary({articleUrl:article.url});


        if(data?.summary){
            const newArticle={...article,summary:data.summary};
            setArticle(newArticle);
            //once we set an article we also need to update it to the all articles list 
            //we do have articles to display until we reload the page


            const updatedAllArticles=[newArticle,...allArticles];
            setAllArticles(updatedAllArticles)

            console.log(newArticle)
            //after we got new articles we need to also update the same in our local storage by coding for it
            localStorage.setItem('articles',JSON.stringify)
        }

        alert('submitted')
        //we need to make an actual api request 
        //fetch summary
        //api gpt based summarizer

    }


    const handleCopy=(copyUrl)=>{


        setCopied(copyUrl);
        navigator.clipboard.writeText(copyUrl);
        //we need to set the copied after a certain point of time to be able to show the successful
        //animation


        setTimeout(()=>setCopied(false),2000);

    }

  return (
    <section className='mt-16 w-full max-w-xl'>
        {/* inside this first we need to create the search functionality
         */}
         <div className='flex flex-col w-full gap-2'>

            <form className='relative flex jusitfy-center items-center'
            onSubmit={handleSubmit}>
                <img 
                 src={linkIcon}
                 alt="link_icon"
                 className='absolute left-0 my-2 ml-3 w-5'
                 />
                 <input
                 type="url"
                 placeholder='enter a URL'
                 value={article.url}
                 onChange={(e)=>setArticle({... article,url:e.target.value})}
                 required
                 className='url_input peer'
                 />
                 <button
                 type="submit"
                 className='submit_btn
                 peer-focus:border-gray-700
                 peer-focus:text-gra-700'>

                 </button>



            </form>
            {/* /below the form we need to show the user their history */}

            <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
                {allArticles.map((item,index)=>(
                    <div
                    key={`link-${index}`}
                    onClick={()=> setArticle(item)}
                    className='link_card'>

                    <div className='copy_btn' onClick={()=> handleCopy(item.url)}>
                        <img
                        src={copied === item.url ? tick:copy}
                        alt="copy_icon"
                        className='w-[40%] h-[40%] object-contain'/>
                    </div>
                    <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}

                    </p>
                    </div>

                ))}

            </div>

            {/* after that we need to display the results of it */}

            {/* displaying results is the most important part of them  */}

         </div>
        

    <div className='my-10 max-w-full flex justify-center items-center'>
        {isFetching ? (
            <img src={loader} alt="loader" className="w-20 h-20 object-contain"/>
        ):error ? (
            <p>
                well that was not supposed to happen ..
                <br/>
                <span className="font-satoshi font-normal text-gray-700">
                    plz retry again
                    {error?.data?.error}
                </span>
            </p>
        ):(
            article.summary && (
                <div className='flex flex-col gap-3'>


                    <h2  className='font-satoshi font-bold text-gray-600 text-xl'>
                        Article <span className='blue_gradient'>Summary</span>
                    </h2>
                    <div className='summary_box'>
                        <p className='font-inter font-medium text-sm text-gray-700'>
                            {article.summary}
                        </p>
                        
                    </div>
                </div>
            )
        )}

    </div>
    </section>
  )
}

export default Demo
