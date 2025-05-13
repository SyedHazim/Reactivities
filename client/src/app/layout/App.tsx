import { Box, Container, CssBaseline, Typography } from "@mui/material";
import { useState } from "react"


import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/Dashboard/ActivityDashboard";
import { useActivities } from "../../lib/hooks/useActivities";

function App() {
const [selectedActivity,setSelectedActivity] = useState<Activity|undefined>(undefined);
const [editMode,setEditMode]= useState(false);
//const {data : activities,isPending}=

const {activities,isPending} = useActivities()



const handleSelectedActivity = (id:string) =>{
  setSelectedActivity(activities!.find(x=>x.id===id));
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





  return (
    <Box sx={{bgcolor:'#eeeeee'}}>
    <CssBaseline />
    <NavBar openForm ={handleOpenForm} />
    <Container maxWidth='xl' sx={{mt:3}}>
      {!activities || isPending ?(<Typography variant='h2'>Loading...</Typography>):(
      <ActivityDashboard activities={activities}
      selectActivity = {handleSelectedActivity}
      cancelSelectActivity ={handleCancelSelectedActivity}
      selectedActivity = {selectedActivity}
      editMode={editMode}
      openForm ={handleOpenForm}
      closeForm = {handleCloseForm}
      />
      )}
  
    </Container>
    
    </Box>

  )
}

export default App
