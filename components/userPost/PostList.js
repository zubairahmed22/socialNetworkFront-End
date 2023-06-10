import {Avatar}from "antd"
import moment from "moment"
import renderHTML from "react-render-html"
import { HeartFilled, HeartOutlined } from "@ant-design/icons"
import { useContext } from "react"
import { UserContext } from "../../Context"
import UserRoute from "../../Router/UserRoute"
import { CommentOutlined , EditOutlined,DeleteOutlined} from "@ant-design/icons"
import { useRouter } from "next/router"


const postList = ({
  post,handleDelete,
  handleLike,handleUnLike,
  handleComment,
 
}) =>{
 const router = useRouter();
  const [state] = useContext(UserContext);
  /// comment 

  console.log(post) 

  const sourceImage = (user) =>{
    if(user.image){
        return user.image.url
    }else{
        return "/images/default.jpg"
    }
}


    return(
   <> 
       {post && post.map((post) =>
        <div className="postlist" key={post._id}>
          <div className="userName">
                 
                <Avatar size={35} src={ sourceImage(post.postedBy)}/>
                 
                                
                  
             
          </div>
      
          {renderHTML(post.content)}
         

        <div className="image">
        
        
       {post.image &&(
       <div
       style={{
        backgroundImage: "url(" + post.image.url + ")",
        backgroundRepeat: "no-repeat",
        backgroundPosition:"center center",
        backgroundSize: "cover",
        height:"350px",
        width:"100%"
        
      }}
       >
         

       </div>
       )
       
       }
       
        
       
        </div>
         <div className="Date">
           {moment(post.createdAt).fromNow()}
         </div>
         <div className="likes_comment">
          {post.likes.includes(state && state.user._id) ? (
           <p> {post.likes.length} <HeartFilled onClick={() => handleUnLike(post._id)}
            className="likeStyle"/></p>
          ):(
            <p> {post.likes.length} <HeartOutlined onClick={() => handleLike(post._id)} 
            className="likeStyle"/></p>
          )
          }
           
           <p> {post.comments.length} <CommentOutlined onClick={() => handleComment(post)} className="likeStyle" /></p>
         
            {state && state.user && state.user._id === post.postedBy._id && (
               <>
               <p> Edit <EditOutlined  onClick={() => router.push(`/users/${post._id}`)} className="likeStyleEdit" /></p>
               <p> Delete <DeleteOutlined onClick={() => handleDelete(post)} className="likeStyle" /></p>
               </>
            )}
           
           
           
         </div>
           </div> 

   
    )}</>
    
    )}

export default postList;