import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../ViewCourse/ViewCourse.css"
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import EditSylabus from "../AddCourse/EditSylabus";

function ViewCourse(){

    const {id} = useParams()

    const [open, openChange] = useState(false)
    const [sylabusId,setSylabusId] = useState()

    const navigate = useNavigate()

    const [courseDetail,setCourseDetail] =useState([])

    useEffect(()=>{
        getCourse()
    },[open])

    const getCourse = ()=>{
        fetch(`http://localhost:4600/course/getcourse/${id}`,{
            method : "GET"
        })
        .then((dt)=> dt.json())
        .then((value)=> setCourseDetail(value))
    }
   
    console.log(courseDetail)

    const editFunction =(id)=>{
         openChange(!open)
         setSylabusId(id)
    }

    const deleteFunction = (id)=>{

         fetch(`http://localhost:4600/sylabus/delete-sylabus/${id}`,{
            method : "DELETE"
         })
         .then(()=> getCourse())
    }

    return(
        <div className="single-course">
            <div className="course-ele">
          <div>Course Name : {courseDetail.CourseName}</div>
          <div>Total Duration : {courseDetail.Duration}</div>
          <div>Course-Fee : {courseDetail.Amount}</div>
          <div>Sylabus:</div>
          </div>
          {courseDetail?.Sylabus?.map((ele)=>{
             return(
                <div className="sylabus">
                    <div className="heading"><h4>Heading : </h4><div>{ele.Heading}</div></div>
                   
                    <div className="content"><h4>Content : </h4><div>{ele.Content.map((val)=>{
                        return(
                            <p>{val}</p>
                        )
                    })}
                    </div>
                    </div>
                    <div className="activity"><h4>Activities :</h4><div>{ele.Activities}</div></div>
                    <Button onClick={()=>editFunction(`${ele._id}`)} size="small">Edit</Button>
                    <Button size="small" onClick={()=>deleteFunction(`${ele._id}`)}>Delete</Button>
                </div>
             )
          })}

           <Dialog open={open} onClose={open} fullWidth>
                <DialogContent>
                 <EditSylabus sylabusId={sylabusId}/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>openChange(!open)} >close</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}
export default ViewCourse;