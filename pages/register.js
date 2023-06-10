import { useState , useContext} from "react";
import axios from "axios"
import {toast}from "react-toastify"
import {Modal} from "antd"
import Link from "next/link"

import AuthForm from "../components/forms/AuthForm";
import { UserContext } from "../Context";
import { useRouter } from "next/router";

const Register = () =>{

    const [name,setName]= useState('')
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [secret, setSecret] = useState('')
    const [ok,SetOk] =  useState(false)
    const [loading,setLoading] =  useState(false)
    const router = useRouter();

    const [state] = useContext(UserContext)



    const handleSubmit = async (e) =>{
          e.preventDefault();
       try {
           setLoading(true)
        const {data} = await axios.post(`/register`,{
            name,
            email,
            password,
            secret
        })
        if(data.error){
            toast.error(data.error)
        }else{
            setName("")
            setEmail("")
            setPassword("")
            setSecret("")
            SetOk(data.Ok)
            setLoading(false)
        }
       
        
       } catch (err) {
        toast(err.response.data)
        setLoading(false)
       }
    }

    if(state && state.token) router.push('/')

    return(
        <div className="register">
            <div className="background">
            <h1>Register</h1>
            </div>
            
          
            <div className="inputFeild">
                <AuthForm
                 handleSubmit={handleSubmit}
                 name={name}
                 setName={setName}
                 email={email}
                 setEmail={setEmail}
                 password={password}
                 setPassword={setPassword}
                 secret={secret}
                 setSecret={setSecret}
                />
            </div>
            <div className="Model">
                <Modal
                title="Congratulation"
                visible={ok}
                onCancel={()=>  SetOk(false)}
                footer={null}
                >
                <p>You have successfully registerd.</p>
                <Link href="/login">
                    <a className="BtnL">login</a>
                </Link>
                </Modal>
                

            </div>
                    <div className="alreadyregister">
                    <p>already registerd?  <Link href="/login">
                    <a className="">login</a>
                </Link></p>
                </div>
        </div>
    )
}
export default Register;