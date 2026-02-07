import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePage'
import Createpage from './pages/Createpage'
import NoteDetailPage from './pages/NoteDetailPage'
import toast from 'react-hot-toast'

const App = () => {
  return (
    <div data-theme="forest" className='bg-gradient-to-t from-green-900 to-40% to-black'>
      {/* <button className='btn btn-outline'>click</button> */}
        
      <Routes>
        <Route path="/" element={<HomePage />} />
         <Route path="/create" element={<Createpage />} />
          <Route path="/note/:id" element={<NoteDetailPage/>} />
        </Routes>

    </div>
  )
}

export default App