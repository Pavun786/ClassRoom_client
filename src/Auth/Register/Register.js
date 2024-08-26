import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import "../Register/Register.css"
import { Button } from "@mui/material";
import { format } from 'date-fns';
import dayjs from 'dayjs';

 function Register(){


   const [values, setValues] = useState(dayjs(""));

   const navigate = useNavigate()

     const formik = useFormik({
          
         initialValues : {
             Username : "",
             Dob : "",
             Email : "",
             Password : "",
             Role : ""
         },

         onSubmit : (values)=>{

             console.log(values)

            //  values.Dob = values.Dob.toISOString();
            
             fetch(`http://localhost:4600/user/register`,{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
             })
             .then(()=>navigate("/login"))
         }
     })

   


      const handleDateChange=(date)=>{

        //to covert the date into UTC format for to avoid improper date issues
      
        // const utcDate = format(date, 'yyyy-MM-dd HH:mm:ss', { timeZone: 'UTC' });
        formik.setFieldValue('Dob',date); 

        //   const utcDate = new Date(Date.UTC(
        //     date.getFullYear(),
        //     date.getMonth(),
        //     date.getDate()
        //     ))

        //   formik.setFieldValue('Dob',utcDate)
      }

     return(
        <>
         <form onSubmit={formik.handleSubmit} className="register">
          <div> 
          <h3>Register</h3> 
          </div>  
          <div className="input_Feilds">
         <TextField id="outlined-basic"
         className="input" 
         label="Username" 
         variant="outlined" 
         name ="Username"
         value ={formik.values.Username}
         onChange={formik.handleChange}
         />
     
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <DemoContainer components={['DatePicker']}>
         <DatePicker 
         label="Dob"
         disableFuture={true}
          name="Dob"
          value={values}
          onChange={handleDateChange}
         />
         </DemoContainer>
      </LocalizationProvider>

    {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="DOB"
          name="DOB"
          format="DD/MM/YYYY"
          value={formik.values.Dob}
          onChange={(value) => formik.setFieldValue("Dob",value,true)}
          
        
        />
      </LocalizationProvider>   */}

          <TextField id="outlined-basic" 
           className="input" 
         label="Email" 
         variant="outlined" 
         name ="Email"
         value ={formik.values.Email}
         onChange={formik.handleChange}
         />
          <TextField id="outlined-basic" 
          className="input" 
         label="Password" 
         variant="outlined" 
         name ="Password"
         value ={formik.values.Password}
         onChange={formik.handleChange}
         />
         
         <InputLabel id="demo-simple-select-label">Role</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={formik.values.Role}
          label="Role"
          name="Role"
          onChange={formik.handleChange}
        >
          <MenuItem value={1}>Admin</MenuItem>
          <MenuItem value={2}>Student</MenuItem>
          <MenuItem value={3}>Mentor</MenuItem> 
        </Select>
        
         <Button type="submit" variant ="outlinead">Submit</Button>
         <p>Already You have an account ? <Link to="/login">Login</Link> </p>
         </div>
         </form>  
        </>
     )
 }
 export default Register;