import { useFormik } from "formik"
import { Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import "../AddCourse/AddCourse.css"
import { useNavigate } from "react-router-dom";
import addcourseImage from "../../assets/Add course.jpg"

function AddCourse() {

   

   const navigate = useNavigate()


    const formik = useFormik({
       
        initialValues: {
            CourseName: "",
            Duration: "",
            Amount: "",
            Poster : ""
           
        },

        onSubmit: (values) => {

            console.log(values)
          
            fetch("http://localhost:4600/course/addNewCourse",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
            })
             .then(()=>navigate("/"))
            
        }
    }
    )

   
  return (

      <div className="addcourse-container">
        <img className="addcourseImage" src={addcourseImage}/>
        <form className="addcourse-form" onSubmit={formik.handleSubmit}>
            <TextField
                id="standard-basic"
                label="CourseName"
                variant="standard"
                value={formik.values.CourseName}
                name="CourseName"
                onChange={formik.handleChange}
            />

            <TextField
                id="standard-basic"
                label="Duration"
                variant="standard"
                value={formik.values.Duration}
                name="Duration"
                onChange={formik.handleChange}
            />
            
            <TextField
                id="standard-basic"
                label="Poster"
                variant="standard"
                value={formik.values.Poster}
                name="Poster"
                onChange={formik.handleChange}
            />

            <TextField
                id="standard-basic"
                label="Course-Amount"
                variant="standard"
                value={formik.values.Amount}
                name="Amount"
                onChange={formik.handleChange}
            />
            <Button variant="info" type="submit">Add Course</Button>
         </form>
      </div>
       
    )
}
export default AddCourse;