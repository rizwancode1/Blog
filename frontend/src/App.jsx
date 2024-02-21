import { useState, useEffect } from 'react'
import {Header ,Footer} from './components/compIndex'
import { Outlet } from 'react-router-dom';



function App() {
 

  return  (
    <div className='h-full w-full flex '>
    <div className='w-full block'>
      <Header />
      <main className=''>
      <Outlet />
      </main>
      <Footer />
    </div>
  </div>
  )
}

export default App
