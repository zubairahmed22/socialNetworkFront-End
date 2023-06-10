import Link from 'next/link'

const CommnetForm = ({addComment, comment,setComment}) =>{
    return(
       
         <form onSubmit={addComment}>
           <textarea type="text" className="form-control"
           placeholder="Type Comment..."
           value={comment}
           onChange={(e) => setComment(e.target.value)}
           /><br></br>
           <button className="commentBtn"> Comment</button>
         </form>
        
    )
}
export default CommnetForm