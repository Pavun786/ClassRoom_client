import { useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { Button,TextField } from "@mui/material";


function EditCourse(){

  const [course,setCourse] = useState("")
  const {id} = useParams()

useEffect(()=>{
   getCourse()
},[])

 const getCourse = async ()=>{
     await fetch(`http://localhost:4600/course/getcourse/${id}`,{
        method : "GET"
     })
     .then((dt)=> dt.json())
     .then((val)=> setCourse(val))
 }

  console.log(course)

 return(
        <div>
         { course ? <EditCourseForm course={course} setCourse={setCourse}/> : "Loading..."}
        </div>
    )
}



function EditCourseForm({course,setCourse}){

  const navigate = useNavigate()
   
   const formik = useFormik({
      
          initialValues: {
            CourseName: course.CourseName,
            Duration: course.Duration,
            Poster : course.Poster.url,
            Amount: course.Amount,
        },

        onSubmit : async (values)=>{
             
            console.log(values)

            fetch(`http://localhost:4600/course/editCourse/${course._id}`,{
                method : "PUT",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
            })
             .then(()=>navigate("/"))
            
        }
})
 
   
    return(
        <div>
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
            
           <Button type="submit"  variant="contained">Edit Course</Button>


        </form>
        </div>
    )

}

export default EditCourse;
