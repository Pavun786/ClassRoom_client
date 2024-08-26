import { useParams } from "react-router-dom";
import SylabusPlan from "../../Components/SylabusPlan/SylabusPlan";
import "../Class/Class.css"
import { useEffect, useState } from "react";
import TaskSubmission from "../../Components/TaskSubmission/TaskSubmission";

 function Class (){
     
     const {id} = useParams()
     const [sylabus,setSylabus] = useState()
     const role = localStorage.getItem("role")
     const courseName = localStorage.getItem("courseName")

     //here data get from child 
     const getSylabusByDay=(value)=>{
           
          console.log(value)
          setSylabus([value])
     }
     
      console.log(sylabus)
      
     return(
        <div className="class-container">
          <div className="class">  
          <h3>CourseName : {courseName} </h3>
          {  sylabus?.map((ele)=>{
             return(
                <div className="class-details">
                    <h2>Heading</h2>
                    <div>{ele.Heading}</div>
                    <h2>Contents:</h2>
                    {ele.Content.map((val)=>{
                        return(
                            <div> * {val}</div>
                        )
                    })}
                    <h2>Activities</h2>
                    <div>{ele.Activities}</div>
                     
               {role == 2 ?  <TaskSubmission sylabusId ={ele._id} /> : null}    
                     
                </div>
             )
          })}
           {/* <TaskSubmission sylabusId={sylabus._id}/> */}
          </div>
          <div className="plan">
          <SylabusPlan getSylabusByDay={getSylabusByDay}/>
          </div>
        </div> 
     )
 }
 export default Class;