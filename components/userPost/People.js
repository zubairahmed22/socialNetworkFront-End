import {useContext}from "react"
import {Avatar} from "antd"
import moment  from "moment"
import {useRouter}from "next/router"
import {UserContext}from "../../Context"

const People = ({people,handleFollow}) =>{
    const [state] = useContext(UserContext)
    
    const sourceImage = (user) =>{
        if(user.image){
            return user.image.url
        }else{
            return "/images/default.jpg"
        }
    }



    return(
        <>
             {/* <pr>{JSON.stringify(people,null, 4)}</pr> */}
    {people && people.map((user) =>
        
        <div className="card1" key={user._id}>
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
                <button  className="btn" onClick={() => handleFollow(user)}>Follow</button>
            </div>
    </div>
    
    )}
    </>

   
    )
}

export default People;