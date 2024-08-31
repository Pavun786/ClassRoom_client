import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {useState,useEffect} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
import "../SingleTask/SingleTask.css"

 function SingleTask(){

const DemoPaper = styled(Paper)(({ theme }) => ({
  // width: 650,
  // height: 550,
  margin :10,
  padding: theme.spacing(1),
  ...theme.typography.body2,
//   textAlign: 'center',
}));

 const [task,setTask] = useState("")
 const [searchParams] = useSearchParams()
 let taskId = searchParams.get("taskId")
//  const [sylabus,setSylabus] = useState("")
//  const userId = localStorage.getItem("userId")
//  const role = localStorage.getItem("role")
 const navigate = useNavigate()
 

 useEffect(()=>{
    
    getTask()
 },[])

 const getTask = async()=>{
      
      try{

        const data = await fetch(`http://localhost:4600/task/${taskId}`,{
            method : "GET",
            
        })
        const res = await data.json()
        console.log("res",res)
        setTask([res])

      }catch(err){
         console.log(err.message)
      }
     
 }

 
 
 console.log("task",task)

     return(
        <div>
          <h3>Tasks</h3>
          {task && task?.map((ele)=>{
             return(
                <DemoPaper variant="elevation">
                <div className='task'>Student-Name : {ele.userId.Username}</div>
                <div className='task'>Course-Name : {ele.courseId.CourseName}</div>
                <div className='task'>Heading : {ele.sylabusId.Heading}</div>
                <div className='task'>Contents:</div>
                    {ele.sylabusId.Content.map((val)=>{
                        return(
                            <div className='task'> * {val}</div>
                        )
                    })}

                <div className='task'>sourceLink :<a href={ele.sourceLink} target='blank'>{ele.sourceLink}</a></div>
                <div className='task'>deployedLink :<a href={ele.deployedLink} target='blank'>{ele.deployedLink}</a> </div>
                    </DemoPaper>
             )
          })}
          
        </div>
     )
 }

 export default SingleTask;