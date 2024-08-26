import { useEffect, useState } from "react";
import Course from "../Course/Course";
import "../CourseList/CourseList.css"


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
        <h4>CourseList</h4>
        <div className="courseList-container">
        {allCourses.map((ele)=>( <Course details={ele}/>))}
        </div>
        </>
    )
 }
 export default CourseList;