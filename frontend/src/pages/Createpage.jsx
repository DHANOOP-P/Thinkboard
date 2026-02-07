import axios from 'axios'
import { ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Link ,Navigate,useNavigate } from 'react-router'
import api from '../../lib/axios'


const Createpage = () => {
  const [title,setTitle]=useState("")
  const [content,setContent]=useState("")
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate()
const handleSubmit =async(e)=>{
  e.preventDefault(); 
  if(!title || !content){
      toast.error("all fields are require");
      return;
   }

   setLoading(true)
   try {
      await api.post("/notes",{
        title,
        content});
        toast.success("Note created successfully");
        navigate("/")
   } catch (error) {
    console.log("error in fetching notes")
    toast.error(" error in Note creation ");
   }
   finally{
    setLoading(false)
   }
}

  return (
    <div className='min-h-screen bg-base-200 bg-gradient-to-t from-green-900 to-40% to-black'>
       <div className='container mx-auto px-4 py-8'>
          <Link to={"/"} className='btn btn-ghost mb-6'> 
             <ArrowLeftIcon/>
          </Link>
          <div className='card bg-base-100 shadow-md shadow-gray-600'>
             <div className='card-body'>
                 <h2 className='card-title text-2xl mb-4'> Create New Note</h2>
                 <form onSubmit={handleSubmit}>
                   <div className='form-control  mb-4'>
                       <label className='label flex py-2'>
                           <span className='label-text'>Title:-</span>
                       </label>
                       <input type="text"
                        placeholder='Note Title'
                        className='input input-bodered'
                        value={title}
                        onChange={(e)=> setTitle(e.target.value)}
                       />
                   </div>

                       <div className='form-control  mb-4'>
                       <label className='label flex py-2'>
                           <span>Content:-</span>
                       </label>
                       <textarea 
                        placeholder='write your text note here '
                        className='textarea textarea-bordered'
                        value={content}
                        onChange={(e)=> setContent(e.target.value)}
                       />
                   </div >

                   <div className='card-actions justify-end'>
                      <button type='submit' className='btn btn-primary' disabled={loading}>
                        {loading? "creating..":"create note"}
                      </button>
                   </div>
                 </form>
             </div>

          </div>
       </div>
    </div>
  )
}

export default Createpage