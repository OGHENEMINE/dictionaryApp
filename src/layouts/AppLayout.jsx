import React from 'react';
import {Outlet} from 'react-router-dom'
import Footer from '../components/Footer';
import TopNav from '../components/TopNav';

function AppLayout() {
  return (
    <div className='min-h-screen font-poppins overflow-hidden box-border scroll-smooth'>
    <TopNav/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default AppLayout
