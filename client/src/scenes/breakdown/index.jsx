import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import BreakdownChart from "components/BreakdownChart";
import { host } from "../../utils/APIRoutes";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Breakdown = () => {

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

  
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="BREAKDOWN" subtitle="Breakdown of Sales By Category" />
      <Box mt="40px" height="75vh">
        <BreakdownChart />
      </Box>
    </Box>
  );
};

export default Breakdown;