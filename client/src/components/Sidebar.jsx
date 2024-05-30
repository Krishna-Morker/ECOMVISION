import React from 'react'
import  {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
} from "@mui/icons-material";
import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom';
import FlexBetween from 'components/FlexBetween';
import profileImage from "assets/app_logo.png";
import { host } from "../utils/APIRoutes";
import axios from "axios";

const navItems = [
    {
        text: "Dashboard",
        icon:<HomeOutlined/>
    },
    {
        text: "Client Facing",
        icon:null
    },
    {
        text: "Products",
        icon:<ShoppingCartOutlined/>
    },{
        text: "Customers",
        icon:<Groups2Outlined/>
    },
    {
        text: "Transactions",
        icon:<ReceiptLongOutlined/>
    },
    {
        text: "Geography",
        icon:<PublicOutlined/>
    },
    {
        text: "Sales",
        icon:null
    },
    {
        text: "Overview",
        icon:<PointOfSaleOutlined/>
    },
    {
        text: "Daily",
        icon:<TodayOutlined/>
    },
    {
        text: "Monthly",
        icon:<CalendarMonthOutlined/>
    },
    {
        text: "Breakdown",
        icon:<PieChartOutlined/>
    },
    {
        text: "Management",
        icon:null
    },
    {
        text: "Admin",
        icon:<AdminPanelSettingsOutlined/>
    },
    {
        text: "Performance",
        icon:<TrendingUpOutlined/>
    },
]

const Sidebar = ({
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMoblie,
    user
}) => {

    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme  = useTheme();
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

    useEffect(()=>{
        setActive(pathname.substring(1));
    },[pathname]);
  return (
   <Box component="nav">
      {isSidebarOpen && (
        <Drawer
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant='persistent'
            anchor='left'
            sx={{

                width:drawerWidth,
                "& .MuiDrawer-paper" : {
                    color:theme.palette.secondary[200],
                    backgroundColor:theme.palette.background.alt,
                    boxSizing:"border-box",
                    borderWidth: isNonMoblie ? 0 : "2px",
                    width:drawerWidth
                }
            }}
        
        >
            <Box width="100%">
                <Box m = "1.5rem 2rem 2rem 3rem"> {/* top right bottom left */}
                 <FlexBetween color={theme.palette.secondary.main}>
                    <Box display="flex" alignItems="center" gap="0.5rem">
                        <Typography variant='h4' fontWeight="bold">
                            ECOMVISION
                        </Typography>
                    </Box>
                    {!isNonMoblie && (
                        <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <ChevronLeft></ChevronLeft>
                        </IconButton>
                    )}
                 </FlexBetween>
                </Box>
                <List>
                    {navItems.map(({text,icon}) => {
                        if(!icon){
                            return (
                                <Typography key={text} sx={{m : "2.25rem 0 1rem 3rem"}}>
                                    {text}
                                </Typography>
                            )
                        }
                        const lctext = text.toLowerCase();

                        return (
                            <ListItem key = {text} disablePadding>
                                <ListItemButton
                                 onClick={() => {
                                    navigate(`${lctext}`);
                                    setActive(lctext);
                                }}
                                sx={{
                                    backgroundColor: active === lctext ? theme.palette.secondary[300] : "transparent",
                                    color: active === lctext 
                                    ? theme.palette.primary[600]
                                    : theme.palette.secondary[100],
                                }}
                                >
                                   <ListItemIcon
                                    sx={{
                                        ml:"2rem",
                                        color:
                                         active === lctext 
                                         ? theme.palette.primary[600] 
                                         : theme.palette.secondary[200],

                                    }}
                                   >
                                    {icon}
                                    </ListItemIcon> 
                                    <ListItemText primary={text}/>
                                    {active === lctext && (
                                        <ChevronRightOutlined sx={{ml:"auto"}}/>
                                    )}
                                </ListItemButton>
                            </ListItem>
                        )
                    })}
                </List>
            </Box>
            <Box position="relative" bottom="1rem">
                <Divider/>
                <FlexBetween textTransform="none" gap="1rem" m = "1.5rem 5rem 0 3rem">
                    <Box 
                    component="img"
                    alt="profile"
                    src='https://res.cloudinary.com/drxcjij97/image/upload/v1707052827/zupx5ylgkrtq33lzzkma.png'
                    height="40px"
                    width="40px"
                    borderRadius="50%"
                    sx={{objectFit : "cover"}}
                    />
                    <Box textAlign="left">
                        <Typography fontWeight="bold" fontSize="0.9rem" sx={{color:theme.palette.secondary[100]}}>
                            {currentUser?.name}
                        </Typography>
                        {currentUser?.occupation && <Typography  fontSize="0.8rem" sx={{color:theme.palette.secondary[200]}}>
                            {user.occupation}
                        </Typography>}
                    </Box>

                  
                </FlexBetween>
            </Box>
        </Drawer>
      ) }
   </Box>
  )
}

export default Sidebar
