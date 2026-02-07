import React, { useEffect, useState } from 'react'

import { Link, useNavigate, useParams } from 'react-router'
import api from '../../lib/axios'
import { ArrowLeftIcon, Loader2Icon, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';

const NoteDetailPage = () => {
 const[note,setNote]=useState(null);
 const[loading,setloading]=useState(true);
 const[saving,setSaving]=useState(false);


 const navigate =useNavigate();

  const{id}=useParams();
  console.log({id})

  useEffect(()=>{
    const fetchNote =async ()=> {
      try {
        const res= await api.get(`/notes/${id}`)
        setNote(res.data);
        
      } catch (error) {
        console.log("error in fetching note",error)
        toast.error("failed to fetch note")
      }finally{
           setloading(false)
      }
    };
    fetchNote();
  },[id]);
  const handledelete =async ()=>{
         if(!window.confirm("are sure to delete the note"))return;
        
         try {
          await api.delete(`/notes/${id}`);
          toast.success("noete deleted successfuylly")
          navigate("/");
         } catch (error) {
          console.log("error in deleting the note ",error)
          toast.error("failed to delete");
         }
  }
   const handlesave =async()=>{
    if(!note.title.trim() || !note.content.trim()){
         toast.error("please enter all fields")
         return;
    }
     setSaving(true)  ;  
      try {
            await api.put(`/notes/${id}`,note)
            toast.success("note updated successfully");
            navigate("/")
          } catch (error) {
             console.log("error in deleting the note ",error)
          toast.error("failed to delete");
          }finally{
            setSaving(false)  ; 
          }
  }



   if(loading){
    return<div className='min-h-screen bg-base-200 flex items-center justify-center'>
       <Loader2Icon className='animate-spin size-10'/>
    </div>
   }
  return (
    <div className='min-h-screen bg-base-200 flex justify-center bg-gradient-to-t from-green-900 to-40% to-black '>
      <div className='md:w-[60%] w-full '>
{/* header cpntent */}
      <div className='container mx-auto px-4 py-8 '>
        <div className='flex items-center justify-between mb-6'>
              <Link to={"/"} className='btn btn-ghost'>
                  <ArrowLeftIcon className='h-5 w-5'/>
              </Link>
              <button onClick={handledelete} className='btn btn-error btn-outline' >
                DeleteNote<Trash2Icon className='h-5 w-5'/>
              </button>
        </div>
      </div>
 {/*form content  */}
     <div className='card bg-base-100'></div>
         <div className='card-body'> 
           {/*titel area  */}
            <div className='form-control mb-4'>
              <label className='label flex py-2'>
                <span className='label-text'>Title</span>
              </label>
              <input type="text"
               placeholder='Note title'
               className='input input-bordered'
               value={note.title}
               onChange={(e) => setNote({...note,title:e.target.value})}
              />
            </div>
            {/* text area */}
            <div className='form-control mb-4'>
              <label className='label flex py-2'>
                <span className='label-text'>Content</span>
              </label>
              <textarea 
               placeholder='write note here'
               className='textarea  textarea-bordered'
               value={note.content}
               onChange={(e) => setNote({...note,content:e.target.value})}
              />
            </div>
           {/* button */}
            <div className='card-actions justify-end'>
              <button className='btn btn-primary' disabled={saving} onClick={handlesave}  >
                {saving ?"saving....":"save note"}
              </button>
            </div>


         </div>
    </div>


    
  </div>
  )
}

export default NoteDetailPage