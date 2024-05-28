import React, { useState, useEffect } from 'react';
import { FormControl, MenuItem, InputLabel, Box, Select } from '@mui/material';
import Header from "../../components/Header";
import OverviewChart from "../../components/OverviewChart";
import { host } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Overview = () => {
    const [ view, setView ] = useState("units")
    const [currentUser,setCurrentUser] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
       // console.log("current",currentUser)
       // console.log(response,"response")
       console.log("fetchind Data")
        const response = await axios.get(`${host}/login/sucess`, {withCredentials: true});
        console.log(response,"response");
        if(response.data.sta==1){
          if(response.data.user) setCurrentUser(response.data.user);
        }else{
          navigate("/login")
        }
  
    } catch (error) {
      console.log(error)
      navigate("/login")
    }

    };

    
    fetchData();
  }, []);

    console.log("🚀 ~ file: index.jsx:8 ~ Overview ~ view", view)
  return (
    <Box m="1.5rem 2.5rem">
        <Header title="OVERVIEW" subtitle="Overview of general revenue and profit" />
        <Box height="75vh">
            <FormControl sx={{ mt: "1rem"}} >
                <InputLabel>View</InputLabel>
                <Select value={view} label="View" onChange={(e) => setView(e.target.value)} >
                    <MenuItem value="sales">Sales</MenuItem>
                    <MenuItem value="units">Units</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={view} />
        </Box>
    </Box>
  )
}

export default Overview