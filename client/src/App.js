import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import React, { useMemo } from 'react';
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate,Route, Routes } from 'react-router-dom';
import { theme, themeSettings } from 'theme';
import  Dashboard  from 'scenes/dashboard';
import Layout from 'scenes/layout';
import Products from 'scenes/products';
import Login from 'scenes/login';
import Register from 'scenes/register';
import Admin from "scenes/admin";
import Customers from 'scenes/customers';
import Transactions from 'scenes/transactions';
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from 'scenes/daily';
import Monthly from 'scenes/monthly';
import  Breakdown from "./scenes/breakdown";
import Performance from "scenes/performance";
import Forgotpass from 'scenes/forgetPass';
import Changepass from 'scenes/changepass';

function App() {
  const mode=useSelector((state)=>state.global.mode)
  const theme= useMemo(()=>createTheme(themeSettings(mode)),[mode])
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <Routes>
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="/forgotpassword" element={<Forgotpass />} />
              <Route path="/changepass/:id" element={<Changepass />} />
              <Route element={<Layout />} >
                 <Route path="/" element={<Navigate to="/login" replace />} />
                 <Route path="/dashboard" element={<Dashboard />} />
                 <Route path="/products" element={<Products/>}/>
                 <Route path="/customers" element={<Customers/>}/>
                 <Route path="/transactions" element={<Transactions/>}/>
                 <Route path="/geography" element={<Geography />} />
                 <Route path="/overview" element={<Overview />} />
                 <Route path="/daily" element={<Daily />} />
                 <Route path="/monthly" element={<Monthly />} />
                 <Route path="/breakdown" element={<Breakdown />} />
                 <Route path="/admin" element={<Admin />} />
                 <Route path="/performance" element={<Performance />} />
              </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
