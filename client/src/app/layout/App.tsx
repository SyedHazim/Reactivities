import { Box, Container, CssBaseline } from "@mui/material";
import { useEffect, useState } from "react"
import axios from "axios"
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";

function App() {
const [activites,setActivites] = useState<Activity[]>([]);
const [selectedActivity,setSelectedActivity] = useState<Activity|undefined>(undefined);
const [editMode,setEditMode]= useState(false);

useEffect(()=>
{
  axios.get<Activity[]>('http://localhost:5000/api/activities')
  .then(response=>setActivites(response.data));

  return ()=>{};
},[])

const handleSelectedActivity = (id:string) =>{
  setSelectedActivity(activites.find(x=>x.id===id));
}

const handleCancelSelectedActivity = () =>{
  setSelectedActivity(undefined);
}

const handleOpenForm =(id?:string) =>{
  if(id) handleSelectedActivity(id);
  else handleCancelSelectedActivity();
  setEditMode(true)
}

const handleCloseForm = ()=>{
  setEditMode(false);
}

const handleSubmitForm =(activity:Activity)=>{
  if(activity.id){
    setActivites(activites.map(x=>x.id=== activity.id? activity:x))
  }
  else
  {
    const newActivity ={...activity,id:activites.length.toString()}
    setActivites([...activites,newActivity])
  }
  setEditMode(false)
}

const handleDelete =(id:string) =>{
  setActivites(activites.filter(x=>x.id !== id))
}

  return (
    <Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline />
    <NavBar openForm ={handleOpenForm} />
    <Container maxWidth='xl' sx={{mt:3}}>
    <ActivityDashboard activities={activites}
    selectActivity = {handleSelectedActivity}
    cancelSelectActivity ={handleCancelSelectedActivity}
    selectedActivity = {selectedActivity}
    editMode={editMode}
    openForm ={handleOpenForm}
    closeForm = {handleCloseForm}
    submitForm ={handleSubmitForm}
    deleteActivity={handleDelete}
    />
    </Container>
    
    </Box>

  )
}

export default App
