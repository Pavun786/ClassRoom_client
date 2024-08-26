import { Button } from "@mui/material"
import {useState,useEffect} from "react"
import "../CourseAllocation/CourseAllocate.css"

  function CourseAllocate(){

    const [requests,setRequests] = useState([])
    const [access,setAccess] = useState("Pending")

    useEffect(()=>{
    
        getALlRequests()
    },[access])

     const getALlRequests = async()=>{
          const requests = await fetch('http://localhost:4600/user/byAllStudents',{
            method : "GET"
        })
         const res = await requests.json()

         setRequests(res)
     }

   const accessAllowFunction = (courseId,userId)=>{
        let access = "Allow"  
        // setAccess("Allow")
        // console.log("allow",access)
        accessAction(courseId,userId,access)
   }

   const accessDeniedFunction = (courseId,userId)=>{
    let access = "Reject"
          
    // setAccess("Pending")
    // console.log("denaid",access)
    accessAction(courseId,userId,access)
}

  const accessAction = async(courseId,userId,access)=>{

        let data = {
            courseId : courseId,
            userId : userId,
            permission : access
        }

      console.log("data",data)

       const allowAccess = await fetch(`http://localhost:4600/user/setAccess`,{
            
              method : "PUT",
              headers : {
                 "Content-type" : "application/json"
              },
              body : JSON.stringify(data)
       }) 
       const res = await allowAccess.json()
       getALlRequests()
     } 

      console.log(requests)
  return(
        <div>
            <table>
                <thead>
                    <tr>
                        <th>S.no</th>
                        <th>UserName</th>
                        <th>Role</th>
                        <th>Course-Name</th>
                        <th>Access</th>
                        <th>Actions</th>
                        
                     </tr>
                    
                </thead>
                <tbody>
          {requests?.map((ele,index)=>(
             
                   ele.Access?.map((value,ind)=>(
                            <tr key={index}>
                             
                            <td>{index+1}</td>
                            <td>{ele?.Username}</td>
                            <td>{ ele?.Role == 2 ? "Student" : "Mentor"}</td>
                            <td>{value?.courseName}</td>
                            <td>{value?.permission}</td>
                            <td>
                              <Button onClick={()=>accessAllowFunction(`${ele.Access[ind].courseId}`,`${ele._id}`)}>Allow</Button>
                              <Button onClick={()=>accessDeniedFunction(`${ele.Access[ind].courseId}`,`${ele._id}`)}>Denied</Button>
                       </td> 
                        </tr>
                        
                    ) )
                   
            ))}
                </tbody>
            </table>
          
        </div>
     )
  }
  export default CourseAllocate;