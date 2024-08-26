import { useEffect, useState } from "react";
import * as React from 'react';
import "../GetAllStudents/GetAllStudents.css"
import studentListImage from "../../assets/profile.png"


function GetAllStudents(){

    const [students,setStudents] = useState([])

    useEffect(()=>{
       
        getAllStudents()
    },[])

    const getAllStudents = async() =>{

        const data = await fetch('http://localhost:4600/student/getAllStudents',{
            method : "GET"
        })

        const res = await data.json()

        setStudents(res)

    }

    console.log(students)

    return(
 
       <div className="student-container">
        <div>
       <img className="studentListImage" src={studentListImage}/>
       </div>
       <div>
       <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Student Name</th>
      <th scope="col">Email</th>
      
    </tr>
  </thead>
  <tbody>

    {students.map((ele,index)=>{
        return(
            <tr>
           <td>{index+1}</td>
            <td>{ele.Username}</td>
            <td>{ele.Email}</td>
          </tr>
        )
    })}

 </tbody>
       </table>
       </div>

       </div>   
    )
 }

 export default GetAllStudents;