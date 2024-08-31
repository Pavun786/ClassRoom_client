import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../ViewCourse/ViewCourse.css"
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import EditSylabus from "../AddCourse/EditSylabus";
import industries from "../../assets/industries.png"

function ViewCourse(){


    const benifits = [
        {
            "icon": <i class="bi bi-currency-rupee"></i>,
             "desc" : "Get Funded by Investors for your project"
        },
        {
            "icon": <i class="bi bi-person-lines-fill"></i>,
             "desc" : "A program designed by Subject-Matter Experts"
        },
        {
            "icon": <i class="bi bi-award"></i>,
             "desc" : "Globally Recognized Certification from partner "
        },
        {
            "icon": <i class="bi bi-router"></i>,
             "desc" : "LIVE classes + Lifetime recorded videos"
        },
        {
            "icon": <i class="bi bi-translate"></i>,
             "desc" : "Available in English, தமிழ் and हिंदी"
        },
        {
            "icon": <i class="bi bi-calendar-week"></i>,
             "desc" : "Hands-on Workshops & Hackathons"
        },
    ]


    const {id} = useParams()

    const [open, openChange] = useState(false)
    const [sylabusId,setSylabusId] = useState()
    const role = localStorage.getItem("role")

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
    <>
      <div className="view-banner">
      
       <img className="view-bannerImg" src={courseDetail.Poster?.url}/>
       
        <div className="view-bannerdesc">
            <h2>About our Program</h2>
            <p>Unlock the full potential of web development with our expert-led online course. Dive deep into the ecosystem, learn to create responsive and interactive user interfaces, and gain hands-on experience with real-world projects.
             Whether you're a beginner or looking to enhance your skills, our course offers personalized learning paths, interactive exercises, and ongoing support to help you become a pro. 
            Start your journey today and build the web applications of tomorrow with confidence!"
        </p>
           
        </div>
      </div>

      <div className="sylabus-container">
        <p className="sylabus-head">Sylabus covered</p>
        <div className="sylabus-cards">
        {courseDetail?.Sylabus?.map((ele)=>{
            return(
                <div className="sylabus-card">
                    <div className="cardHeading">{ele.Heading}</div>
                    <div className="content">
                        <div>{ele.Content.map((val)=>{
                        return(
                            <p>{val}</p>
                        )
                    })}

                    </div>
                    </div>
                    {role == 1 ? [<Button onClick={()=>editFunction(`${ele._id}`)} size="small">Edit</Button>,
                    <Button size="small" onClick={()=>deleteFunction(`${ele._id}`)}>Delete</Button>] : null}
                    
                </div>
            )
        })}
        </div>
      </div>

      <div className="industry">
         <div>Learn from Industry Experts</div>
         <p>Get personalized mentorship and guidance from several Industry experts who work in leading companies such as</p>
         <img className="industry-img"src={industries}/>
      </div>

      <div className="benifits">
        <div className="benifit-head">Benefits of Our Program</div>
        <div className="benifit-list">
        {benifits.map((ele)=>{
            return(
                <div className="benifit-group">
                    <div className="icon">{ele.icon}</div>
                    <div>{ele.desc}</div>
                </div>
            )
        })}
      </div>
      </div>
      
        {/* <div className="single-course">
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
        </div> */}
        </>
    )
}
export default ViewCourse;