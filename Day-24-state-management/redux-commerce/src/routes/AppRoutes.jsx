import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import ProductDetails from '../pages/ProductDetails'
import NotFound from '../pages/NotFound'

const AppRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path ="/" element = {<Home/>}/>
            <Route path="/cart" element = {<Cart/>}/>
            <Route path = "/product/:id" elemen={<ProductDetails/>}/>
            <Route path = "*" element={<NotFound/>}/>
        </Routes>
      
    </div>
  )
}

export default AppRoutes
