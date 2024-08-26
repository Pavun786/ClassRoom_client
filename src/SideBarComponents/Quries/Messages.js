import {format} from "timeago.js"
import "../Quries/Quries.css"


 function Messages ({message,own}){

     return(
        <div className={own ? "message-own" : "message"}>
         <div >
            <p className="messageText">
             {message?.text}
            </p>
         </div>
         <div>{format(message?.createdAt)}</div>
        </div>
     )
 }
 export default Messages;