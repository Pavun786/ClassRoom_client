import { useParams } from "react-router-dom";
import SylabusPlan from "../../Components/SylabusPlan/SylabusPlan";
import "../Class/Class.css"
import { useEffect, useState } from "react";
import TaskSubmission from "../../Components/TaskSubmission/TaskSubmission";
import learning from "../../assets/learning.avif"

 function Class (){
     
     const {id} = useParams()
     const [sylabus,setSylabus] = useState([])
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
          <h5>CourseName : {courseName} </h5>
         
        {sylabus.length == 0 ? <div className="class-introduction">

          <img src={learning} className="class-img"/>  
         <div>Unlock the full potential of web development with our expert-led online course. 
            Dive deep into the ecosystem, learn to create responsive and interactive user interfaces, 
            and gain hands-on experience with real-world projects. 
            Whether you're a beginner or looking to enhance your skills, our course offers personalized learning paths, 
            interactive exercises, and ongoing support to help you become a pro. 
            Start your journey today and build the web applications of tomorrow with confidence!"</div> 
         <div style={{color:"blue"}}>let`s start your journey without any delay...</div>  
         </div>
        
         :   ( sylabus.map((ele)=>{
            return(
               <div className="class-details">
                   <h5>Heading</h5>
                   <div>{ele.Heading}</div>
                   <h5>Contents:</h5>
                   {ele.Content.map((val)=>{
                       return(
                           <div> * {val}</div>
                       )
                   })}
                   <h5>Activities</h5>
                   <div className="activity">{ele.Activities}</div>
                    
              {role == 2 ?  <TaskSubmission sylabusId ={ele._id} /> : null}    
                    
               </div>
            )
         }))
    }

         
           {/* <TaskSubmission sylabusId={sylabus._id}/> */}
          </div>
          <div className="plan">
          <SylabusPlan getSylabusByDay={getSylabusByDay}/>
          </div>
        </div> 
     )
 }
 export default Class;