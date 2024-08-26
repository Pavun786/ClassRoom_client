import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import "../SylabusPlan/SylabusPlan.css"


 function SylabusPlan({getSylabusByDay}){

    const [course,setCourse] = useState("")
    const {id} = useParams()
  
  useEffect(()=>{
     getCourse()
  },[])
  
  const getCourse = async () => {
    try {
      const response = await fetch(`http://localhost:4600/course/getcourse/${id}`);
      const data = await response.json();
      setCourse(data);
      localStorage.setItem("courseName", data.CourseName);
    } catch (error) {
      console.error('Error fetching course:', error);
    }
  }
     
   const getSylabus = (id)=>{
  
       fetch(`http://localhost:4600/sylabus/get-sylabus/${id}`,{
          method : "GET"
       })
        .then((dt)=> dt.json())
        .then((val)=> getSylabusByDay(val))

   }
     
     return(
        <div className="sylabus-plan">

     {course?.Sylabus?.map((ele,index)=>{
             return(
               <div className="day-plan" onClick={()=>getSylabus(`${ele._id}`)}>
                Day-{index+1} 
               </div>
             )
          })}   

        </div>
     )
 }
 export default SylabusPlan;