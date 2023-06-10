import { SyncOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";


const ResetPasswordForm = ({email,Newpassword,secret,
    handleSubmit,setNewPassword,setSecret,
    setEmail, loading, setLoading
    
}) =>{
    return(
        <div className="register">
        <form onSubmit={handleSubmit}>
                  
                
                    <div className="textContainer">
                    <label className="labelName">Email</label><br></br>
                    <input className="nameFeild" 
                     value={email}
                     onChange={(e)=>setEmail(e.target.value)}
                    type="email" placeholder="Enter Email"/>
                    </div>
                    <div className="textContainer">
                    <label className="labelName"> New Password</label><br></br>
                    <input className="nameFeild" 
                     value={Newpassword}
                     onChange={(e)=>setNewPassword(e.target.value)}
                    type="password" placeholder="Enter New Password"/>
                    </div>

                  
                       
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
                    </>
                    <div>
                    <button disabled={!email || !Newpassword || !secret} className="Btn" >Reset</button>
                        
                    </div>
                </form> 
                </div>

    )
}

export default ResetPasswordForm;