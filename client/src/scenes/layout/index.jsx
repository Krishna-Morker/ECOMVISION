import React ,{useState} from 'react'
import { Box, useMediaQuery } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from 'components/Navbar.jsx';
import Sidebar from 'components/Sidebar';
import { useGetUserQuery } from 'state/api';
import Logout from 'scenes/logout';
function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useSelector((state)=>state.global.userId);
  const {data} = useGetUserQuery(userId);
  
  return (
  <Box display={isNonMobile ? "flex" : "block"}  width="100%" height="100%">
    <Sidebar 
      isNonMobile={isNonMobile}
      drawerWidth="250px"
      isSidebarOpen={isSidebarOpen}
      setIsSidebarOpen={setIsSidebarOpen}
      user = {data || {}}
      />
    <Box flexGrow={1}>
      <Navbar
       isSidebarOpen={isSidebarOpen}
       setIsSidebarOpen={setIsSidebarOpen}
       user = {data || {}}
      />
      <Outlet />
    </Box>
    <Logout/>
  </Box>
  );
};

export default Layout;