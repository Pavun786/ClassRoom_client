import { Link, useNavigate } from "react-router-dom";
import "../Course/Course.css"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import SendIcon from '@mui/icons-material/Send';
import { useState,useEffect } from "react";
import { colors } from "@mui/material";


function Course({details}){

    const navigate = useNavigate()
    const role = localStorage.getItem("role")
    const userId = localStorage.getItem("userId")
    const[list,setList] = useState([])
    const [user,setUser] = useState("")
    


    useEffect(()=>{
        getUser()
        
        if(role == 3) 
        toCheckAvailabilty() 
    },[])

    const toCheckAvailabilty = async() =>{

       let check = await fetch(`http://localhost:4600/mentor/askAccessByMentor/${userId}`,{
         method : "GET"
       })
       let res = await check.json()
       console.log("res",res)
       setList(res)
    }

      console.log(list)

    const getUser = async()=>{
       
      let user = await fetch(`http://localhost:4600/student/getStudent/${userId}`,{
         method : "GET"
      })
      let res = await user.json()
      setUser(res)
    }
    
     console.log(user)  

    const requestEvent = async(courseId)=>{

      // setStatus(!status)

    //  let id = Math.floor(Math.random() * 90) + 10;

      let value = {
         courseId : courseId,
         permission : "Pending",
        
      }
    
      let accsess = await fetch(`http://localhost:4600/user/askAccess/${userId}`,{
         method : "PUT",
         headers :{
           "Content-type" : "application/json",
         },
         body : JSON.stringify(value)
      })
     
      let res = await accsess.json()

      if(accsess.status == 200){

         alert(res.message)
      }else {
        alert(res.message)
      }

    }

    return(
       
        <Card sx={{ minWidth: 350 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={details.Poster.url}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
        Course :{details.CourseName} 
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Duration :{details.Duration} 
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
        Price :{details.Amount} 
        </Typography>
      </CardContent>
      <Button onClick={()=>navigate(`/view/${details._id}`)} size="small">View</Button>
      { role == 1 ? <CardActions>
        {/* <Button onClick={()=>navigate(`/view/${details._id}`)} size="small">View</Button> */}
        <Button onClick={()=>navigate(`/edit-course/${details._id}`)} size="small">Edit</Button>
        <Button size="small">Delete</Button>
      </CardActions> : null}
      {  role == 1 ?  <Button onClick={()=>navigate(`/add-sylabus/${details._id}`)}>Add-Sylabus +</Button> : null}
      <div>
      {/* <Button onClick={()=>navigate("/view/:id")}>View-Details</Button> */}
      </div>
     { role == 2 ?  <Button variant="contained" onClick={()=> requestEvent(`${details._id}`)} endIcon={<SendIcon />}>To Access</Button> : null}

    
     { role == 3 ?  <Button variant="contained" disabled={list.some((ele)=> ele.courseId == details._id) ? true : false} onClick={()=> requestEvent(`${details._id}`)} endIcon={<SendIcon />}>Take to handle</Button> : null}
     

     {user[0]?.Access?.some((ele)=> ele.courseId == details._id && ele.permission == "Allow") ? <Button><Link to={`/side-bar/${details._id}`}>{role == 2 ? "Learn" : "Go"}</Link></Button> : null}
     {user[0]?.Access?.some((ele)=> ele.courseId == details._id && ele.permission == "Reject") ? <span style={{marginLeft: "20px",color : "red"}}>Access Denied by admin</span> : <span></span>}

     </Card>
    )
}
export default Course;