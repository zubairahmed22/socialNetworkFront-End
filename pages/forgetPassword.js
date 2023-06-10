import { useState , useContext} from "react";
import axios from "axios"
import {toast}from "react-toastify"
import { LoadingOutlined} from "@ant-design/icons"
import ResetPasswordForm from "../components/forms/forgotPasswordFrom";
import { UserContext } from "../Context";
import { useRouter } from "next/router";

const ForgotPassword = () =>{

    
    const [email, setEmail] = useState('')
    const [Newpassword,setNewPassword] = useState('')
    const [secret, setSecret] = useState('')
    const [ok,SetOk] =  useState(false)
    const [loading,setLoading] =  useState(false)
    const router = useRouter();

    const [state] = useContext(UserContext)


    
    const handleSubmit = async (e) =>{
          e.preventDefault();
       try {
           setLoading(true)
        const {data} = await axios.post(`/forgotpassword`,{
           
            email,
            Newpassword,
            secret
        })
        
        if(data.error){
            toast.error(data.error);
            setLoading(false)
        } else{
        setEmail("")
        setNewPassword("")
        setSecret("")
        SetOk(toast.success(data.success))
        setLoading(false)
        }
       
        
       
        
       } catch (error) {
        console.log("checking error",data.error)
        toast(error.response.data)
        
        setLoading(false)
       }
    }
  
    if(state && state.token) router.push('/')

    return(
        <div className="register">
            <div className="background">
            <h1>Forgot Password</h1>
            </div>
            
        
            <div className="inputFeild">
                <ResetPasswordForm
                 handleSubmit={handleSubmit}
            
                 email={email}
                 setEmail={setEmail}
                 Newpassword={Newpassword}
                 setNewPassword={setNewPassword}
                 secret={secret}
                 setSecret={setSecret}
                 loading={loading}
                 setLoading = {setLoading}
                />
            </div>
            
           
            
        </div>
    )
}
export default ForgotPassword ;