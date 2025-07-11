import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import BuyCredit from './pages/BuyCredit'
import Result from './pages/Result'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
const App = () => {
  return (
   <div className='min-h-screen bg-slate-50'>
    <ToastContainer position='top-right'/>
<Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/result' element={<Result/>}/>
      <Route path='/plans' element={<BuyCredit/>}/>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App