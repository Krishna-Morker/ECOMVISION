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
    isNonMoblie
}) => {

    const {pathname} = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme  = useTheme();

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
        </Drawer>
      ) }
   </Box>
  )
}

export default Sidebar
