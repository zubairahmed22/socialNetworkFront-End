import Link from "next/link";
import { useContext,useEffect, useRef, useState } from "react";
import { UserContext } from "../Context";
import { useRouter } from "next/router";
import {RightOutlined}from "@ant-design/icons"
const Nav = () => {
const [state, setState] = useContext(UserContext)
const [url, setUrl] = useState('')
const [click, setClick] = useState(false)
const router = useRouter();

useEffect(() =>{

process.browser && setUrl(window.location.pathname)

},[process.browser && window.location.pathname])

console.log(url)
const logout = () =>{
window.localStorage.removeItem("auth");
setState(null)
router.push('/login')
}


const handleClick = () => setClick(!click)
let menuRef = useRef()

useEffect(() =>{
 let handler = (event) =>{
   
      if(!menuRef?.current?.contains(event.target)){
        setClick(false)
      }
     
    
  }
  document.addEventListener("mousedown",handler)

  return () =>{
    document.removeEventListener('mousedown',handler)
  }

},[])


    return(
      <div className="NavStyle">
       
          
 <Link href="/" >
   <a className={`${url === "/" && "Lin_style"}`}>Home</a> 
   </Link>
{state !== null ? (
  <>
  
  <Link href="#">
    

 <a className={`${url === "/dashboard" && "Lin_style"}`}
 
 >{state && state.user && state.user.name}


 <RightOutlined className="arrowIcon"
 onClick={handleClick}
 />
 </a>
 
 </Link>




   <ul ref={menuRef} className={click?  "ulid": "ulmenu"}
   
   >
     <Link href="/updateProfile">
     
     <a
      className={`${url === "/dashboard" && "Lin_style"}`}
   >UserProfile</a>
     </Link>
     <Link href="/dashboard"  >
     <a 
     className={`${url === "/dashboard" && "Lin_style"}`}

>
     <li >Dashboard</li>
       </a>
       </Link>
   </ul>





<a onClick={logout} >Logout</a>
 
 </>
)
:(<>
  <Link href="/login" >
    <a className={`${url === "/login" && "Lin_style"}`} >Loign</a> 
    </Link>
      
     <Link href="/register" >
     <a className={`${url === "/register" && "Lin_style"}`}>Register</a> 
     </Link>
  </>)}

  

   
   
     

          

      </div>
    )
}

export default Nav