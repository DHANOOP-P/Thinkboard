import { Link } from 'react-router'
import React from 'react'
import { PenSquareIcon, Trash2Icon } from 'lucide-react'
import { formatDate } from '../../lib/utils'
import toast from 'react-hot-toast'
import api from '../../lib/axios'

const NoteCard = ({note,setNotes}) => {
//delete function
  const handleDelete = async(e,id)=>{
       e.preventDefault();//to seperate button from Link
    
       if(!window.confirm("are u sure to delete"))return;

       try {
        await api.delete(`/notes/${id}`);
        setNotes((prev) => prev.filter(note =>note._id !==id))// to refresh after delete
        toast.success("successfully deleted");
        
       } catch (error) {
        console.log("error in handleDelete",error)
        toast.error("failed to delete note")
       }
  }
  return (
<Link  to={`/note/${note._id}`} className='card bg-base-100 
hover:shadow-lg transition-all duration-200 border-t-4 border-solid 
border-[#00FF9D] shadow-md shadow-violet-500' >
   <div className='card-body '>
     <h3 className='card-title text-base-content'>{note.title}</h3>
     <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
    
    <div className='card-actions justify-between items-center mt-4'>
        <span className='text-sm text-base-content/60'>{formatDate(note.createdAt)}</span>
        
        <div className='flex items-center gap-1'> 
           <PenSquareIcon size={20}/>
           <button  className='btn-btn-ghost btn-xs text-error'onClick={(e)=>handleDelete(e,note._id)}>
              <Trash2Icon size={20}/>
           </button>
        </div>

    </div>

    </div>
</Link>
  )
}

export default NoteCard