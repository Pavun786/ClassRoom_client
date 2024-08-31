import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import "../LeaderBoard/LeaderBoard.css"
import leaderboard from "../../assets/leaderboard.webp"

function Leaderboard(){

   // const DemoPaper = styled(Paper)(({ theme }) => ({
   //    width: 900,
   //    height: 40,
   //    margin :15,
   //    padding: theme.spacing(2),
   //    ...theme.typography.body2,
   //    textAlign: 'center',
   //  }));

   const [leaderBoard,setLeaderBoard] = useState("")
   const {id} = useParams()

   console.log(id)

   useEffect(()=>{
      getLeaderBoardDetails()
   },[])

   const getLeaderBoardDetails = async()=>{
       
       const result = await fetch(`http://localhost:4600/review/leader-board/${id}`,{
          method : "GET"
       })
      const data = await result.json()
      setLeaderBoard(data)
   }

   console.log(leaderBoard)

     return(
        <div className="leader-container">
            <h3>Leaderboard</h3>
            <img src={leaderboard} className="leaderboard-img"/>
            <div className="leader-table">
               <div className="lead-hd">Rank</div>
               <div className="lead-hd">studentName</div>
               <div className="lead-hd">courseName</div>
               <div className="lead-hd">score</div>
            </div>
            { leaderBoard && leaderBoard?.map((ele,index)=>{
                return(
                   <div className="leader-table" key={index}>
                   <div>{index+1}</div>  
                   <div>{ele._id.userName}</div>
                   <div>{ele._id.courseName}</div>
                   <div>{ele.totalMarks}</div>
                   </div>
                )
            })}
        </div>
     )
  }
  export default Leaderboard;