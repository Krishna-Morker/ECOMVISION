import React, { useState,useEffect } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import FlexBetween from "components/FlexBetween";
import { useDispatch } from "react-redux";
import { setMode } from "state";
import profileImage from "assets/app_logo.png";
import {
  AppBar,
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { logoutRoute,host } from "../utils/APIRoutes";
import  Cookie from 'js-cookie';
import axios from "axios";

const Navbar = ({ user, isSidebarOpen, setIsSidebarOpen }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const navigate = useNavigate();
  const [currentUser,setCurrentUser] = useState(undefined);

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
    
    const handleLogout = async () => {
      handleClose();
     console.log("123");
      const response = await axios.get(`${host}/login/sucess`, { withCredentials: true });
      const data = await axios.get(`${logoutRoute}/${response.data.user._id}`,{withCredentials:true});
      if (data.status === 200) {
     
     Cookie.remove('jwt', { path: '/' });
        navigate("/login");
      }
    };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search..." />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap="1.5rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          {/* <IconButton>
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton> */}

           <FlexBetween>
            <Button onClick={handleClick} sx={{display:"flex", justifyContent:"space-between", alignItems:"center", textTransform:"none", gap:"1rem",}}>
            <Box 
                    component="img"
                    alt="profile"
                    src='https://res.cloudinary.com/drxcjij97/image/upload/v1707052827/zupx5ylgkrtq33lzzkma.png'
                    height="32px"
                    width="32px"
                    borderRadius="50%"
                    sx={{objectFit : "cover"}}
            />
            
            <Box textAlign="left">
                        <Typography fontWeight="bold" fontSize="0.85rem" sx={{color:theme.palette.secondary[100]}}>
                            {currentUser?.name}
                        </Typography>
                       {currentUser?.occupation && <Typography  fontSize="0.75rem" sx={{color:theme.palette.secondary[200]}}>
                            {user.occupation}
                        </Typography>}
                        </Box>
                        <ArrowDropDownOutlined sx={{color:theme.palette.secondary[300] , fontSize:"25px" }} />
                    
            </Button>
            <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal:"center"}}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>

           </FlexBetween>

        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;