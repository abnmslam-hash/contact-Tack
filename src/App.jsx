import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Component/Home/Home'
import About from './Component/About/About'
import Portfolio from './Component/portfolio/Portfolio'
import Contact from './Component/Contact/Contact'
import Layout from './Component/layout/Layout'
let s =  createBrowserRouter([
  {
    pathm:"" , element:<Layout/>,children : [
      {path : "" , element :<Home/>},
      {path : "about" , element :<About/>},
      {path : "portfolio" , element :<Portfolio/>},
      {path : "contact" , element :<Contact/>},
  ]
}
 
])
function App() {

  return (
    <>

     <RouterProvider router={s}></RouterProvider>
    </>
  )
}

export default App
