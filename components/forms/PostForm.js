import {Avatar} from "antd";

import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import ('react-quill'),{ssr: false});
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import {CameraOutlined,LoadingOutlined}from "@ant-design/icons"

const postForm =({content, setContent, 
    postSubmit, handleImage,
    uploading, setUploading, image
}) =>{
    return(
     <div className="cratePost">
     <ReactQuill
     theme="snow"
     
      className="textbox" type='text'
     value={content}
     onChange={(e) => setContent(e)}
     placeholder="Create Post">
       
    </ReactQuill><br></br>
    <div className="footerdev">
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

     <button className="PostBTN"
      disabled={!content}
     onClick={postSubmit}
     >Post</button>
    </div>
     </div>
    )
}
export default postForm;