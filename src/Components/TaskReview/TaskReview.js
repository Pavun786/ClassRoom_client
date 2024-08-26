import { useFormik } from "formik"
import { Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import "../AddCourse/AddCourse.css"
import { useNavigate,useSearchParams } from "react-router-dom";
import "../TaskReview/TaskReview.css"
import SingleTask from "../SingleTask/SingleTask";


function TaskReview() {

   

   const navigate = useNavigate()

   const [searchParams] = useSearchParams()
   let taskId = searchParams.get("taskId")

   let reviewBy = localStorage.getItem("userId")

    const formik = useFormik({
       
        initialValues: {
            marks: "",
            comments: "",
         },

        onSubmit: (values) => {

             values.taskId = taskId;
             values.reviewBy = reviewBy

             console.log(values)
          
            fetch("http://localhost:4600/review/review-task",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
            })
             .then(()=>alert("Task reviewed..!✅✅"))
            
        }
    }
    )

   
  return (
       <div className="task-review">
        <SingleTask/>
        <form className="taskReview-form" onSubmit={formik.handleSubmit}>
            <TextField
                id="standard-basic"
                className="task-input"
                label="Marks"
                variant="standard"
                value={formik.values.marks}
                name="marks"
                onChange={formik.handleChange}
            />

            <TextField
                id="standard-basic"
                className="task-input"
                label="Comments"
                variant="standard"
                value={formik.values.comments}
                name="comments"
                onChange={formik.handleChange}
            />
            
            
            <Button variant="contained" type="submit">submit</Button>
         </form>
         </div>
    )
}
export default TaskReview;