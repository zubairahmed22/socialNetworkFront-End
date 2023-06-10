import { useContext, useState,useEffect } from "react"
import {UserContext} from "../Context"
import UserRoute from "../Router/UserRoute"
import PostForm from "../components/forms/PostForm.js"
import {useRouter} from "next/router"
import PostList  from "../components/userPost/PostList.js"
import People from "../components/userPost/People"
import axios from "axios"
import {toast} from "react-toastify"
import Link from 'next/link'
import {Modal} from "antd"
import CommentFrom from "../components/forms/CommentForm"

const dashboard = () =>{
  const [content, setContent] = useState('')
  const [image, setImage] = useState("")
  const [uploading, setUploading] = useState(false)
  const [post, setPost] = useState([])
  const [people, setPeople] = useState([])
  /// commnent
  const [comment,setComment] = useState([])
  const [visable, setVisable] =  useState(false)
  const [currentPost, setCurrentPost] =  useState({})
  // router 
  const router = useRouter()
  const [state,setState] = useContext(UserContext)

  

  



  useEffect(() =>{
    if(state && state.token){
      newsFeed()
    findPeople()
    }
    },[state && state.token])


   const findPeople = async() =>{
    try {
      const {data} = await axios.get('/find-people') 
      setPeople(data)
    } catch (error) {
      console.log(error)
    }
    


   }



    const newsFeed = async () => {
      try{
      const {data} = await axios.get('/news-feed');
      // console.log("USER DATA ==>>",data)
      setPost(data)
      }catch(err){
        console.log(err)
      }
    }

  const postSubmit  = async (e) => {
    e.preventDefault();
    

    try {
      const {data} = await axios.post('create-post',{content,image})
      console.log("create post response =>>>",data)
      if(data.error){
        toast.error(data.error)
      }else{
        newsFeed();
        toast.success("Post Created")
        setContent("")
        setImage({})
      }
      
    }
     catch (error) {
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


  const handleDelete = async (post) =>{
   try{
     const answer = window.confirm("Are you sure?")
     if(!answer) return;
     const {data} = await axios.delete(`/delete-post/${post._id}`)
     console.log(data)
     toast.error('post deleted')
     newsFeed()
   }catch(error){
    console.log(error)
   }
  } 

  const handleFollow = async (user) => {
  //  console.log("add this user to following list ", user)
  try {
    const {data} =  await axios.put('/user-follow',{_id: user._id})
    // console.log("handle follow response =>", data)
    let auth = JSON.parse(localStorage.getItem("auth"))
    auth.user = data
    localStorage.setItem("auth",JSON.stringify(auth))
    setState({...state, user: data})
    let filtered = people.filter((p) =>(p._id !== user._id ))
    setPeople(filtered)
    toast.success(`Following ${user.name}`)
    //// rerender the post in news feed
    newsFeed()
  } catch (error) {
    console.log(error)
  }


  }

  

  const handleLike = async (_id) =>{
  // console.log("like this post => ",_id)
  try {
    const {data} = await axios.put('/like-post',{_id})
    console.log('liked data',data)
    newsFeed()
  } catch (error) {
    console.log(error)
  }
  }


  const handleUnLike = async (_id) =>{
    try {
      const {data} = await axios.put('/unlike-post',{_id})
      console.log('unliked data',data)
      newsFeed()
    } catch (error) {
      console.log(error)
    }
    }

    const handleComment = (post) =>{
      setCurrentPost(post)
      
      setVisable(true)

    }

    const addComment = async (e) =>{
    e.preventDefault()
    // console.log('Add comment to this post id =>', currentPost._id)
    // console.log('save comment to db', comment)

    try {
      const {data}= await axios.put('/add-comment',{
        postId: currentPost._id,
        comment,

      })
      console.log('add Comment', data)
      setComment('')
      setVisable(false)
      newsFeed()
    } catch (error) {
      console.log(error)
    }
    }

    const removeComment = async () =>{
      
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
               <div className="postContaier">
                 <PostList 
            post={post}
            handleDelete={handleDelete}
            handleLike={handleLike}
            handleUnLike={handleUnLike}
            handleComment={handleComment}
            
            />
               </div>
              </div>
              <div className="sidebar">
              {state && state.user && state.user.following && <Link href={`/users/following`}>
                <a className="h6">{state.user.following.length} Following</a>
              </Link> }
              <People
              people={people}
              handleFollow={handleFollow}
              />
              </div>
              
            </div>
            <Modal visible={visable} 
            onCancel={() => setVisable(false)} 
            title="Comment"
            footer={null}
            >

              <CommentFrom
              comment={comment}
              addComment={addComment}
              
              setComment={setComment}
              />
            </Modal>
            </div>
            
        </UserRoute>
    )
    
}

export default dashboard