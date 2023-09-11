import React from 'react'
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import DSidebar from './components/DSidebar'
import Header from './components/Header'
import { Route, Routes, useLocation } from 'react-router'
import Dashboard from './pages/Dashboard'
import "./App.css"
import './components/Animation.css'
import Meals from './pages/meals'
import Categories from './pages/Category'
import Orders from './pages/Order'
import SignIn from './pages/Login'
import Statistics from './pages/statistics'

const defaultTheme = createTheme({
  palette: {
    mode : 'dark'
  }
});


const App = () => {
  const location = useLocation()
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box
        sx={{
          display : 'flex',
          gap : '10px',
          minHeight : '100vh',
        }}
      >
        <Box>
          {
            location.pathname !== '/signin' && (
              <DSidebar />
            )
          }
        </Box>

        <Box
          sx={{
            flex : '1'
          }}
        >
          {
            location.pathname !== '/signin' && ( 
              <>  
                <Header />
              </>
            )
          }
            <Routes>
              <Route path='/' element={<Dashboard />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/meals' element={<Meals />} />
              <Route path='/categories' element={<Categories />} />
              <Route path='/orders' element={<Orders />} />
              {/* <Route path='/statistics' element={<Statistics />} /> */}
            </Routes>
        </Box>
      </Box>
      </ThemeProvider>
  )
}

export default App