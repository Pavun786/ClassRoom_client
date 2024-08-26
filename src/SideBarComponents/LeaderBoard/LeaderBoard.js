import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import "../LeaderBoard/LeaderBoard.css"

function Leaderboard(){

   const DemoPaper = styled(Paper)(({ theme }) => ({
      width: 900,
      height: 40,
      margin :15,
      padding: theme.spacing(2),
      ...theme.typography.body2,
      textAlign: 'center',
    }));

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
        <div>
            <h3>Leaderboard</h3>
            <DemoPaper className="leader-table">
               <h3>Rank</h3>
               <h3>studentName</h3>
               <h3>courseName</h3>
               <h3>score</h3>
            </DemoPaper>
            { leaderBoard && leaderBoard?.map((ele,index)=>{
                return(
                   <DemoPaper className="leader-table" key={index}>
                   <div>{index+1}</div>  
                   <div>{ele._id.userName}</div>
                   <div>{ele._id.courseName}</div>
                   <div>{ele.totalMarks}</div>
                   </DemoPaper>
                )
            })}
        </div>
     )
  }
  export default Leaderboard;