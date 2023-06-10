import { useState , useContext,useEffect} from "react";
import axios from "axios"
import {toast}from "react-toastify"
import {Modal,Avatar} from "antd"
import Link from "next/link"
import {LoadingOutlined, CameraOutlined} from "@ant-design/icons"
import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../Context";
import { useRouter } from "next/router";

const profileUpdate = () =>{
    const [username, setUsername] = useState('')
    const [about, setAbout] = useState()
    const [name,setName]= useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [secret, setSecret] = useState('')
    const [ok,SetOk] =  useState(false)
    const [loading,setLoading] =  useState(false)
    const router = useRouter();
    const [state,setState] = useContext(UserContext)

    const [image,setImage] = useState({})
    const [uploading, setUploading] = useState(false)
    console.log("check Image =>>",image)


    const handleSubmit = async (e) =>{
          e.preventDefault();
       try {
           setLoading(true)
        const {data} = await axios.put(`/update-profile`,{
            name,
            email,
            password,
            username,
            about,
            secret,
            image
        })
        console.log("updated response",data)
        if(data.error){
            toast.error(data.error)
        }else{
            
            let auth = JSON.parse(localStorage.getItem("auth"))
            auth.user = data
            localStorage.setItem("auth",JSON.stringify(auth))
            setState({...state,user: data})
            SetOk(true)
            setLoading(false)             
        }
       /// update local storage , update user, keep token

     
        
       } catch (err) {
        toast(err.response.data)
        setLoading(false)
       }
    }
   
    useEffect(() =>{
     if(state && state.user){
        //  console.log("user from state",state.user)
        setUsername(state.user.username)
        setAbout(state.user.about)
        setName(state.user.name)
        setEmail(state.user.email)
        setImage(state.user.image)

     }
    },[ state && state.user])

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
        <div className="register">
            <div className="background">
          <a>  <h1>Profile</h1></a>
            </div>
            
            {loading ? <LoadingOutlined />:""}
            <div className="inputFeild">
            <div className="CamerContainer"> 
            <label>
     {
         image && image.url ?(
             <Avatar size={30} src={image.url} className="iamgePrew"/>
         ) : uploading ? ( <LoadingOutlined className="mt-3"/>) : ( <CameraOutlined className="mt-3"/>)
     }
     <input type="file" 
     onChange={handleImage}
     className= "inputFile" accept="images/*"/>
            </label>
            </div>
                <AuthForm
                 setProfile ={true}
                 username={username}
                 setUsername={setUsername}
                 about={about}
                 setAbout={setAbout}
                 handleSubmit={handleSubmit}
                 name={name}
                 setName={setName}
                 email={email}
                 setEmail={setEmail}
                 password={password}
                 setPassword={setPassword}
                 secret={secret}
                 setSecret={setSecret}
                 loading={loading}
                 setLoading={setLoading}
                />
            </div>
            <div className="Model">
                <Modal
                title="Congratulation"
                visible={ok}
                onCancel={()=>  SetOk(false)}
                footer={null}
                >
                <p>You have successfully updated profile</p>
               
                </Modal>
                

            </div>
                 
        </div>
    )
}
export default profileUpdate;