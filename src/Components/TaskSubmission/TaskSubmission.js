import { useFormik } from "formik"
import { Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import "../TaskSubmission/TaskSubmission.css"
import { useNavigate, useParams } from "react-router-dom";


function TaskSubmission({sylabusId}) {

   

   const navigate = useNavigate()
   const {id} = useParams()
   const userId = localStorage.getItem("userId")
 

    const formik = useFormik({
       
        initialValues: {
            
            sourceLink : "",
            deployedLink : ""
           
        },

        onSubmit: async(values,{ resetForm }) => {

              values.userId = userId
              values.sylabusId = sylabusId
              values.courseId = id
          
        const data = await fetch("http://localhost:4600/task/submitTask",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
            })
             
           if(data.status == 200){
               alert("The Task Submitted Successfully..!")
               resetForm();
           }else if(data.status == 403){
               alert("The Task Already submitted by yourself")
               resetForm();
           } 
        }
    }
    )

   
  return (
        <form className="task-submission" onSubmit={formik.handleSubmit}>
            <TextField
                id="standard-basic"
                label="sourceLink"
                variant="standard"
                value={formik.values.sourceLink}
                name="sourceLink"
                onChange={formik.handleChange}
            />

            <TextField
                id="standard-basic"
                label="DeployedLink"
                variant="standard"
                value={formik.values.deployedLink}
                name="deployedLink"
                onChange={formik.handleChange}
            />
            
           <Button variant="info" type="submit">submit</Button>
         </form>
    )
}
export default TaskSubmission;