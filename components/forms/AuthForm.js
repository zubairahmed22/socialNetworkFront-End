import profileUpdate from "../../pages/updateProfile";
import { LoadingOutlined} from "@ant-design/icons"

const AuthForm = ({name,email,password,secret,
    handleSubmit,setName,setPassword,setSecret,
    setEmail,page,about,setAbout, username, setUsername,
    setProfile,loading,setLoading

}) =>{

  
    return(
        <form onSubmit={handleSubmit}>
                    {
                        setProfile && (
                            <div className="textContainer">
                            <label className="labelName">Username</label><br></br>
                            <input className="nameFeild" 
                            value={username}
                            onChange={(e)=>setUsername(e.target.value)}
                            type="text" placeholder="Enter Username"/>
                            </div>
        
                        )
                    }
                    
                    {setProfile && (<div className="textContainer">
                    <label className="labelName">About</label><br></br>
                    <input className="nameFeild" 
                    value={about}
                    onChange={(e)=>setAbout(e.target.value)}
                    type="text" placeholder="write about yourself..."/>
                    </div>
                    )}

                   { page !== "login" &&( <div className="textContainer">
                    <label className="labelName">Name</label><br></br>
                    <input className="nameFeild" 
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    type="text" placeholder="Enter Name"/>
                    </div>)}
                    
                
                    <div className="textContainer">
                    <label className="labelName">Email</label><br></br>
                    <input className="nameFeild" 
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                     disabled={setProfile}
                    type="email" placeholder="Enter Email"/>
                    </div>
                    <div className="textContainer">
                    <label className="labelName">Password</label><br></br>
                    <input className="nameFeild" 
                     value={password}
                     onChange={(e)=>setPassword(e.target.value)}
                    type="password" placeholder="Enter Password"/>
                    </div>

                   {page !== "login" &&(
                       
                    <>
                    <select className="slect">
                       
                    <option>What is your favourite color? </option>
                    <option>What is your best friend name? </option>
                    <option>What city you ware born? </option>         
                       
                    </select><br></br>
                    <small className="samall">You can use this to reset your password if forgotten</small>
                    
                    <div className="textField">
                    <textarea type='text'className="textType"
                     value={secret}
                     onChange={(e)=>setSecret(e.target.value)}
                    placeholder="Write your answer here..."
                    />
                   
                    </div>
                    </>)}
                    <div>
                       
                    <button disabled={
                        setProfile ? loading : 
                        page === "login" ? !email || !password :!name || !email || !password || !secret} className="Btn"
                     
                        
                    >
                      {loading ? <LoadingOutlined />:""}  submit</button>
                    </div>
                </form> 

    )
}
export default AuthForm;