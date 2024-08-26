import {useFormik} from "formik"
import { Button } from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddSylabus(){

    const[content,setContent] = useState([])
    const[sylabusContent,setSylabusContent] = useState([])
    const {id} = useParams()
    const navigate = useNavigate()

    const formik = useFormik({

        initialValues : {
            
             Heading : "",
             Content : [],
             Activities : ""
                
        },

        onSubmit : (values)=>{
            console.log(values)

            values.Course = id 

            fetch("http://localhost:4600/sylabus/create",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
            })
            .then(()=> alert("sylabus added"))
            .then(()=> navigate("/list"))
            
        }
    })

   const AddContent =()=>{
         setContent([...content,sylabusContent])
        //  setSylabusContent("")
         formik.setFieldValue("Content", [...content, sylabusContent]);
         setSylabusContent("")
        }

    const removeContent = (ind)=>{
        
         let res = content.filter((ele,index)=> index !== ind )
         setContent([...res])
        formik.setFieldValue("Content",[...res])
    
    }       

    return(
        <form className="sylabus-container" onSubmit={formik.handleSubmit}>
           <TextField 
       id="standard-basic" 
       label="Heading" 
       variant="standard"
       value={formik.values.Heading}
       name ="Heading"
       onChange = {formik.handleChange}
       />

    <TextField 
       id="standard-basic" 
       label="Content" 
       variant="standard"
       value={sylabusContent}
       name ="sylabusContent"
       onChange = {(e)=>setSylabusContent(e.target.value)}
       />
       <Button variant="contained" onClick={AddContent}>Add</Button>
      {(formik.values.Content).map((ele,index)=>{
        return(
            <div className="content-div">{ele}<button onClick={()=> removeContent(index)}>-</button></div>
        )
      })}
     <TextField 
       id="standard-basic" 
       label="Activities" 
       variant="standard"
       value={formik.values.Activities}
       name ="Activities"
       onChange = {formik.handleChange}
       />

    
      <Button type="submit" variant="contained">submit</Button>
       </form>
       
    )
}

export default AddSylabus;