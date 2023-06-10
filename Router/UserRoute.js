import {useEffect,useState,useContext}from "react"
import axios from "axios"
import {useRouter} from "next/router"
import {UserContext } from "../Context"
import {SyncOutlined}from "@ant-design/icons"

const UserRoute = ({children}) => {

const [state] = useContext(UserContext)

const [ok,setOk] = useState(false)
const router = useRouter();

useEffect(() => {
 
if(state && state.token)getCurrentUser()

},[state && state.token])

const getCurrentUser = async () => {
    try{

const {data} = await axios.get(
    `/current-user`
    
);
if(data.ok) setOk(true)
    }catch(err){
      router.push("/login")
    }
}

return !ok ? (<SyncOutlined spin  style={{ fontSize: '30px', color: '#08c',
display:"flex", 
justifyContent:"center",
  }}/>) : (
    <>
    {children}
    </>
    
)
};

export default UserRoute