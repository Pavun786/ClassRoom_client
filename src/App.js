import './App.css';
import Navbar from './Components/Navbar/Navbar';
import CourseList from './Components/CourseList/CourseList';
import { Routes, Route } from "react-router-dom"
import AddCourse from './Components/AddCourse/AddCourse';
import EditCourse from './Components/EditCourse/EditCourse';
import AddSylabus from './Components/AddCourse/AddSylabus';
import ViewCourse from './Components/ViewCourse/ViewCourse';
import Register from './Auth/Register/Register';
import Login from './Auth/Login/Login';
import CourseAllocate from './Components/CourseAllocation/CourseAllocate';
import SideBar from './SideBar/SideBar';
import Class from './SideBarComponents/Class/Class';
import Dashboard from './SideBarComponents/Dashboard/Dashboard';
import Tasks from './SideBarComponents/Tasks/Tasks';
import Leaderboard from './SideBarComponents/LeaderBoard/LeaderBoard';
import Quries from './SideBarComponents/Quries/Quries';
import TaskReview from './Components/TaskReview/TaskReview';
import TaskFeedBack from './Components/TaskFeedBack/TaskFeedBack';
import CreateQuery from './SideBarComponents/Quries/CreateQuery';
import GetSingleQuery from './SideBarComponents/Quries/GetSingleQuery';
import ProtectRoute from './ProtectRoute';
import GetAllStudents from './Components/GetAllStudents/GetAllStudents';
import GetAllMentors from './Components/GetAllMentors/GetAllMentors';

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path='/' element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route  path='/all-students' element={<ProtectRoute> <GetAllStudents/></ProtectRoute>}/>
        <Route  path='/all-mentors' element={<ProtectRoute> <GetAllMentors/> </ProtectRoute>}/>

        <Route path="/list" element={
          <ProtectRoute>
            <CourseList />
          </ProtectRoute>
        } />
        <Route path="/add-course" element={
          <ProtectRoute>
            <AddCourse />
          </ProtectRoute>
        } />
        <Route path='/add-sylabus/:id' element={
          <ProtectRoute>
            <AddSylabus />
          </ProtectRoute>
        } />
        <Route path='/edit-course/:id' element={
          <ProtectRoute>
            <EditCourse />
          </ProtectRoute>
        } />
        <Route path='/view/:id' element={
          <ProtectRoute>
            <ViewCourse />
          </ProtectRoute>
        } />

        <Route path="/all-req" element={
          <ProtectRoute>
            <CourseAllocate />
          </ProtectRoute>
        } />
        <Route path='/side-bar/:id' element={
          <ProtectRoute>
            <SideBar />
          </ProtectRoute>
        }>
          <Route path='class' element={
            <ProtectRoute>
              <Class />
            </ProtectRoute>
          } />
          <Route path='dashboard' element={
            <ProtectRoute>
              <Dashboard />
            </ProtectRoute>
          } />
          <Route path='tasks' element={
            <ProtectRoute>
              <Tasks />
            </ProtectRoute>
          } />
          <Route path='task-review' element={
            <ProtectRoute>
              <TaskReview />
            </ProtectRoute>
          } />
          <Route path='feedback' element={
            <ProtectRoute>
              <TaskFeedBack />
            </ProtectRoute>
          } />
          <Route path='query-create' element={
            <ProtectRoute>
              <CreateQuery />
            </ProtectRoute>
          } />
          <Route path='query' element={
            <ProtectRoute>
              <GetSingleQuery />
            </ProtectRoute>
          } />
          <Route path='leader-board' element={
            <ProtectRoute>
              <Leaderboard />
            </ProtectRoute>
          } />
          <Route path='quries' element={
            <ProtectRoute>
              <Quries />
            </ProtectRoute>
          } />

         
        </Route>
      </Routes>
    </div>
  );
}

export default App;
