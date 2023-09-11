import { HomeOutlined } from '@mui/icons-material'
import { Box, Breadcrumbs, Typography } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const Breadcrumb = () => {
    const location = useLocation()
    const linksArray = location.pathname.split('/')
    console.log(location.pathname)
  return (
    <Box
        sx={{
            width : '100%',
            height : '60px',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'flex-start',
            padding : '20px'
        }}
    >
        <Breadcrumbs aria-label="breadcrumb" 
            sx={{
                "& .MuiBreadcrumbs-separator" :{
                    color : 'gray'
                }
            }}
        >
            {
                location.pathname === '/'
                ? (
                    <HomeOutlined  sx={{color : 'white'}}/>
                )
                : (
                    linksArray.map((link , i) => {
                        if(i+1 === linksArray.length){
                        return (
                            <Typography
                            key={i}
                            color={'secondary'}
                            sx={{
                                textTransform : 'capitalize',
                                fontSize : '20px',
                                color : 'white'
                            }}
                            >
                            {link}
                            </Typography>
                        )
                        
                        }
                        return (
                        <Link 
                        key={i}
                            underline="hover" 
                            color="inherit" 
                            href={`/${link}`}
                            sx={{
                                textTransform : 'capitalize',
                                fontSize : '20px'
                            }}
                        >
                            {link ? link : <HomeOutlined/>}
                        </Link>
                        )
                        
                    })
                )
            } 
      </Breadcrumbs>
    </Box>
  )
}

export default Breadcrumb