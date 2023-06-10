
import { useState,useContext } from "react";
import axios from "axios"
import {toast}from "react-toastify"
import {Modal} from "antd"
import Link from "next/link"
import { LoadingOutlined, } from "@ant-design/icons"
import AuthForm from "../components/forms/AuthForm";
import {useRouter}from "next/router"
import { UserContext } from "../Context";


const Login = () =>{
 

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [loading,setLoading] =  useState(false)

    const [state,setState] = useContext(UserContext);
    const router =  useRouter();



    const handleSubmit = async (e) =>{
          e.preventDefault();
       try {
           setLoading(true)
        const {data} = await axios.post(`/login`,{
         
            email,
            password,
           
        })
       if(data.error){
           toast.error("error in login")
           
       }else{
           
        setState({
            user: data.user,
            token: data.token
        })
        window.localStorage.setItem("auth",JSON.stringify(data))
        
        router.push("/dashboard")
       }
        //   console.log(data)
        setLoading(false)
       
        
       } catch (err) {
        toast(err.response.data)
        setLoading(false)
       }
    }

    // if(state && state.token) router.push('/')


    return(
        <div className="register">
            <div className="background">
            <h1>Login</h1>
            </div>
            
            {loading ? <LoadingOutlined />:""}
            <div className="inputFeild">
                <AuthForm
                 handleSubmit={handleSubmit}
                 email={email}
                 setEmail={setEmail}
                 password={password}
                 setPassword={setPassword}
                 page="login"
                 
                />
            </div>

                    <div className="alreadyregister">
                    <p>Not Yet Registerd?  <Link href="/register">
                    <a className="">Register</a>
                </Link></p>
                </div>

                <div className="alreadyregister">
                     <Link href="/forgetPassword">
                    <a className="forgetPass">Forget Password</a>
                </Link>
                </div>
        </div>
    )
}
export default Login;