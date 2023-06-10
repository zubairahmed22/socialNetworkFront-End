import {useContext,useState,useEffect}from "react"
import {Avatar} from "antd"
import moment  from "moment"
import {useRouter}from "next/router"
import {UserContext}from "../../Context"
import axios from "axios"
import { toast } from "react-toastify"
import {RollbackOutlined}from "@ant-design/icons"
import Link from 'next/link'

const following = () =>{
    const [state, setState] = useContext(UserContext)
    const [people, setPeople] = useState([])


   useEffect(() =>{

    if(state && state.token) fetchFollowing()
   
   },[state && state.token])

   

   const fetchFollowing = async () =>{
       try {
           const{ data} = await axios.get('/user-following')
           console.log("following list data",data)
           setPeople(data)
       } catch (error) {
           console.log(error)
       }
   }


    
    const sourceImage = (user) =>{
        if(user.image){
            return user.image.url
        }else{
            return "/images/default.jpg"
        }
    }

 const handleUnFollow = async (user) =>{
try {
    const {data} = await axios.put('/user-unfollow', {_id: user._id})
    let auth = JSON.parse(localStorage.getItem("auth"))
    auth.user = data
    localStorage.setItem("auth",JSON.stringify(auth))
    setState({...state, user: data})
    let filtered = people.filter((p) =>(p._id !== user._id ))
    setPeople(filtered)
    toast.error(`UnFollowing ${user.name}`)
    
} catch (error) {
    console.log(error)
}
  

 }

    return(
        <div className="followingMainDev">
             {/* <pr>{JSON.stringify(people,null, 4)}</pr> */}
    {people && people.map((user) =>
        
        <div className="card2"  key={user._id}>
        <div className="avatarImage">
        <Avatar size={50} className="avatar" 
         src={sourceImage(user)}
        >
           
        </Avatar>
            </div>
            <div className="Name">
            <h3>{user.username}</h3>
            </div>
            <div className="btndev">
                <button  className="btn" onClick={() => handleUnFollow(user)}>unfollow</button>
            </div>
    </div>
    
    )}
    <Link href="/dashboard" ><a className="rollback">
        <RollbackOutlined />
        </a>
        </Link>
    </div>

   
    )
}

export default following;