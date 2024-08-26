import { useEffect, useState } from "react";
import * as React from 'react';
import "../GetAllStudents/GetAllStudents.css"
import studentListImage from "../../assets/profile.png"


function GetAllMentors(){

    const [mentors,setMentors] = useState([])

    useEffect(()=>{
       
        getAllMentors()
    },[])

    const getAllMentors = async() =>{

        const data = await fetch('http://localhost:4600/mentor/getAllMentors',{
            method : "GET"
        })

        const res = await data.json()

        setMentors(res)

    }

    console.log(mentors)

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
      <th scope="col">Mentor-Name</th>
      <th scope="col">Email</th>

      
    </tr>
  </thead>
  <tbody>

    {mentors.map((ele,index)=>{
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

 export default GetAllMentors;