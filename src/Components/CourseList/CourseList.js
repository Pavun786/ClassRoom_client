import { useEffect, useState } from "react";
import Course from "../Course/Course";
import "../CourseList/CourseList.css"
import Banner from "../Banner";


 function CourseList(){

    const[allCourses,setAllCourses] = useState([])

    const getAllCourses = async()=>{
        let data = await fetch("http://localhost:4600/course/getAllCourse",{
            method : "GET"
        })
        let res = await data.json()
        console.log(res)
        setAllCourses(res)
    }

    useEffect(()=>{
      getAllCourses()
    },[])

    console.log(allCourses)
    return(
        <>
        <Banner/> 
        <div className="courseList-container">
        <div className="courseList-sub">
        <h3>ClassRoom</h3> 
        <div className="courseList-intro">CLASSROOM is one of the industry's leading Project Based Career Programs offered by Google that promises Placement Guidance on completing the course.</div>   
        </div>  
        <div className="courseList-card">
        {allCourses.map((ele)=>( 
           
           <Course details={ele}/>
         
           ))}
        </div>  
       
        </div>
        </>
    )
 }
 export default CourseList;