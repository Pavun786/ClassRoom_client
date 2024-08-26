import { useFormik } from "formik"
import { useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";

function Login(){

    const navigate = useNavigate()

     const formik = useFormik({
          
         initialValues : {
            
             Email : "",
             Password : "",
            
         },

         onSubmit : async(values)=>{

            
       let login = await fetch(`http://localhost:4600/user/login`,{
                method : "POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(values)
             })
           
        let res = await login.json()    
         console.log(res)
        localStorage.setItem("token",res.token)
        localStorage.setItem("role",res.Role)
        localStorage.setItem("userId",res.id)
        navigate("/list")
    }
})


     return(
        <div>
          
   <form onSubmit={formik.handleSubmit} className="register">
    <div> 
          <h3>Login</h3> 
    </div>  
      <div className="input_Feilds">  
      <TextField id="outlined-basic" 
         label="Email" 
         variant="outlined" 
         name ="Email"
         value ={formik.values.Email}
         onChange={formik.handleChange}
         />
          <TextField id="outlined-basic" 
         label="Password" 
         variant="outlined" 
         name ="Password"
         value ={formik.values.Password}
         onChange={formik.handleChange}
         />
         
       <Button type="submit" variant ="outlinead">Submit</Button>
         <p>You don't have an account ? <Link to="/">Register</Link> </p>
         </div> 
         </form>  
         </div>   
     )
}

export default Login;