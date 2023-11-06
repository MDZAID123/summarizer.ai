
// this is where are main application will go 

import React from 'react'


import Hero from './components/Hero';
import Demo from './components/Demo';
//we have almost all the style in the app.css
//that we need


import './App.css';
const App = () => {
  return (
    <main>
        <div className='main'>
            <div className='gradient'/>

        </div>
        <div className='app'>
            <Hero/>
            <Demo/>

        </div>
    </main>
  )
}

export default App
