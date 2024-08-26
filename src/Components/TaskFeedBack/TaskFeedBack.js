

import { useFormik } from "formik"
import { Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import "../AddCourse/AddCourse.css"
import { useNavigate,useSearchParams } from "react-router-dom";
import { useState,useEffect } from "react";
import "../TaskReview/TaskReview.css"
import SingleTask from "../SingleTask/SingleTask";
import "../TaskFeedBack/TaskFeedBack.css"

function TaskFeedBack() {

   

   const navigate = useNavigate()

   const [searchParams] = useSearchParams()
   let taskId = searchParams.get("taskId")
   const [feedback,setFeedBack] = useState("")
//    let reviewBy = localStorage.getItem("userId")

   useEffect(()=>{
      getTaskFeedBack()
   },[])

   const getTaskFeedBack = async()=>{
       
    const feedback = await fetch(`http://localhost:4600/review/feedback/${taskId}`,{
        method : "GET"
    })
    const data = await feedback.json()
    setFeedBack(data)
   }
 
   console.log(feedback)
   
  return (
       <div className="task-review">
        <SingleTask/>
          <div className="feedback">
            <div className="review">Mark:{feedback.marks}</div>
            <div className="review">Comments:{feedback.comments}</div>
          </div>
         </div>
    )
}
export default TaskFeedBack;