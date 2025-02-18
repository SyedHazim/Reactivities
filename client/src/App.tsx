import { ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import axios from "axios"

function App() {
const [activites,setActivites] = useState<Activity[]>([]);

useEffect(()=>
{
  axios.get<Activity[]>('http://localhost:5000/api/activities')
  .then(response=>setActivites(response.data));

  return ()=>{};
},[])

  return (
    <>
    <Typography variant='h4'>Reactivities</Typography>
    <ul>
      {activites.map((activity)=>(
        <ListItem key={activity.id}>
          <ListItemText>
            {activity.title}
          </ListItemText>
        </ListItem>

      ))};      
    </ul>
    </>

  )
}

export default App
