import { useEffect,useState } from "react";
import { useRouter } from "next/router";
import axios from 'axios'
import UserRoute from "../../Router/UserRoute";
import {toast} from "react-toastify"
import PostForm from "../../components/forms/PostForm"

const editPost = () =>{
    const [post, setPost] =  useState({})
    const router = useRouter()
    const [content, setContent] = useState('')
    const [image, setImage] = useState("")
    const [uploading, setUploading] = useState(false)
    // console.log("check router",router)
    const _id = router.query._id
     
    useEffect(() =>{
if(_id) fetchPost();
    },[_id])

   const fetchPost = async () =>{
       try{
       const {data} = await axios.get(`/user-post/${_id}`)
       setPost(data)
       setContent(data.content)
       setImage(data.image)
       
       }catch(error){
         console.log(error)
       }
      
   }

   const postSubmit = async (e) =>{
    e.preventDefault();
    console.log("submit post  Updated now",content,image)
    try{
     const {data} = await axios.put(`/update-post/${_id}`,{content,image});
     if(data.error){
         toast.error(data.error)
     }else{
         toast.success("post updated")
         router.push('/dashboard')
     }
    }catch(error){
        console.log(error)
    }

   }

   const handleImage = async (e) =>{
    const file  = e.target.files[0];
    let  formData = new FormData();
    formData.append('image',file)
    // console.log([...formData])

    setUploading(true)

    try {
      const {data} = await axios.post('/upload-image',formData)
      setImage({
        url: data.url,
        public_id: data.public_id,
      })
      setUploading(false)
    } catch (error) {
      console.log(error)
      setUploading(false)
    }
  }





    return(
        <UserRoute>
        <div className="register">
             <div className="background">
             <h1>New Feed</h1>
             </div>
             <div className="postSection">
               <div className="post">
                <PostForm
                 content = {content}
                 setContent ={setContent}
                 postSubmit={postSubmit}
                 handleImage={handleImage}
                 uploading={uploading}
                 image={image}
 
                />
                
               </div>
              
               
             </div>
             
             
             </div>
             
         </UserRoute>
    )
} 
export default editPost