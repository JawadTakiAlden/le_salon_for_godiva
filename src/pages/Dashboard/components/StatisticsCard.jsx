import { ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import React from 'react'

const StatisticsCard = ({title , value}) => {
    const randomDegree = Math.floor(Math.random() * 360)
  return (
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            width : '100%',
            height : '100%',
            padding  : '30px',
            gap : '15px',
            backgroundImage : `linear-gradient(${randomDegree}deg ,#003348 , #00a1c9)`,
            borderRadius : '15px'
        }}
    >
        <Box
            sx={{
                backgroundImage : 'linear-gradient(#00a1c9 , #003348)',
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'center',
                padding  :'10px',
                borderRadius : '50%'
            }}
        >
            <ProductionQuantityLimitsOutlined 
                sx={{
                    color : 'white',
                }}
            />
        </Box>
        <Box>
            <Typography
                sx={{
                    fontSize : '20px',
                    color : 'white'
                }}
            >
                {value}
            </Typography>
            <Typography
                sx={{
                    color : '#9ba09e',
                    fontSize : '14px',
                    fontWeight : 'normal'
                }}
            >
                {title}
            </Typography>
        </Box>
    </Box>
  )
}

export default StatisticsCard