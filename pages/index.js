import {useContext} from "react";
import {UserContext} from "../Context"

const Home = () =>{
    const [state,setState] = useContext(UserContext);
    return(
        <div className="div_Class">
            <h1>Home page </h1>
            {JSON.stringify(state)}
            <div className="Img_box">
            <img src="/images/default.jpg" alt="pic"
            className="img"
            />
            </div>
         
        </div>
    )
}

export default Home