import { useFormik } from "formik"
import { Button} from "@mui/material";
import TextField from '@mui/material/TextField';
import { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';

import Select from '@mui/material/Select';
import "../Quries/Quries.css"
import { useEffect } from "react";


function CreateQuery() {

   

   const navigate = useNavigate()
   const {id} = useParams()
   const userId = localStorage.getItem("userId")

   const[allCourses,setAllCourses] = useState([])

    const getAllCourses = async()=>{
        let data = await fetch("http://localhost:4600/course/getAllCourse",{
            method : "GET"
        })
        let res = await data.json()
        console.log(res)
        setAllCourses(res)
    }

    useEffect(()=>{
      getAllCourses()
    },[])

    const formik = useFormik({
       
        initialValues: {
            queryTitle : "",
            queryDescription : "", 
            category : "Select-category",
            courseName : "Select-course",
            language : "Select-language",
            status : "Un-Assigned"
        },

        onSubmit: (values) => {

           values.createdBy = userId   
           values.assignedTo = ""
           
           fetch("http://localhost:4600/query/create-query",{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
            })
           .then(()=>navigate(`/side-bar/${id}/quries`))
            
        }
    }
    )

   
  return (
        <form className="addQuery-form" onSubmit={formik.handleSubmit}>
            <TextField
                id="standard-basic"
                label="QueryTitle"
                variant="standard"
                value={formik.values.queryTitle}
                name="queryTitle"
                onChange={formik.handleChange}
            />

            <TextField
                id="standard-basic"
                label="Query-Description"
                variant="standard"
                value={formik.values.queryDescription}
                name="queryDescription"
                onChange={formik.handleChange}
            />
            
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.category}
          label="Category"
          onChange={(e)=> formik.setFieldValue('category', e.target.value)}
        >
          <MenuItem value={"Select-category"}>Select-category</MenuItem>
          <MenuItem value={"Zen-class Doubt"}>Zen-class Doubt</MenuItem>
          <MenuItem value={"Task-Related"}>Task-Related</MenuItem>
          <MenuItem value={"Co-ordination"}>Co-ordination</MenuItem>
        </Select>

        <InputLabel id="demo-simple-select-label">CourseName</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.courseName}
          label="CourseName"
          onChange={(e)=> formik.setFieldValue('courseName', e.target.value)}
        >
         {allCourses.map((ele)=>{
            return(
              <MenuItem value={ele._id}>{ele.CourseName}</MenuItem>
            )
         })} 
         
        </Select>

        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.language}
          label="Language"
          onChange={(e)=> formik.setFieldValue('language', e.target.value)}
        >
          <MenuItem value={"Select-language"}>Select-language</MenuItem>
          <MenuItem value={"Tamil"}>Tamil</MenuItem>
          <MenuItem value={"English"}>English</MenuItem>
          
        </Select>
            <Button  variant="dark" style={{ backgroundColor: 'black', color: 'white' }} type="submit"> create-Query</Button>
         </form>
    )
}
export default CreateQuery;