import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

 function Tasks(){

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 600,
  height: 120,
  margin :15,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));

 const [task,setTasks] = useState("")
 const [sylabus,setSylabus] = useState("")
 const userId = localStorage.getItem("userId")
 const role = localStorage.getItem("role")
 const navigate = useNavigate()
 const {id} = useParams()

 useEffect(()=>{
    
   { role == 2 ? getTasks() : getAllTasks()}
 },[])

 const getTasks = async()=>{
      
      try{

        const data = await fetch(`http://localhost:4600/task/allTask/${userId}/${id}`,{
            method : "GET",
            
        })
        const res = await data.json()
        console.log("res",res)
        setTasks(res)

      }catch(err){
         console.log(err.message)
      }
     
 }

 const getAllTasks = async()=>{
      
    try{

      const data = await fetch(`http://localhost:4600/task/getAllTasks/${id}`,{
          method : "GET",
          
      })
      const res = await data.json()
      console.log("res",res)
      setTasks(res)

    }catch(err){
       console.log(err.message)
    }
   
}
 
 console.log("task",task)

     return(
        <div>
          <h3>Tasks</h3>
          {task && task.map((ele)=>{
             return(
                <DemoPaper variant="elevation">
                <h5>Heading : {ele.sylabusId.Heading}</h5>
                <h5>Content : {ele.sylabusId.Content}</h5>
                <p>sourceLink :{ele.sourceLink}</p>
                <p>deployedLink : {ele.deployedLink}</p>
                {role == 3 ? <Button onClick={()=>navigate(`/side-bar/${id}/task-review?taskId=${ele._id}`)}>Task Review</Button> : <Button onClick={()=>navigate(`/side-bar/${id}/feedback?taskId=${ele._id}`)}>view Feedback</Button> }
                
                </DemoPaper>
             )
          })}
          
        </div>
     )
 }

 export default Tasks;