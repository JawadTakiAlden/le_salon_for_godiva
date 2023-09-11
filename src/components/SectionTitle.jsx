import { Typography } from '@mui/material'
import React from 'react'

const SectionTitle = ({title}) => {
  return (
    <Typography
        sx={{
          fontSize : '25px',
          color : '#00a1c9',
          textTransform : 'uppercase',
          width : 'fit-content',
          position : 'relative',
          border : '1px solid #00a1c9',
          padding : '6px 20px',
          margin : '40px auto',
          position : 'relative',
          transition : 'all 0.5',
          transformOrigin : 'center center',
          "&::after" : {
            content : "''",
            position : 'absolute',
            width :'10px',
            height : '10px',
            backgroundColor : '#00a1c9',
            borderRadius : '50%',
            top : '50%',
            transform : 'translateY(-50%)',
            right : '-15px',
            zIndex : -1
          },
          "&::before" : {
            content : "''",
            position : 'absolute',
            width :'10px',
            height : '10px',
            backgroundColor : '#00a1c9',
            borderRadius : '50%',
            top : '50%',
            transform : 'translateY(-50%)',
            left : '-15px',
            zIndex : -1
          },
          "&:hover" : {
            color : '#fff',
          },
          "&:hover::after" : {
            animation : 'circle-right-animation 0.5s forwards'
          },
          "&:hover::before" : {
            animation : 'circle-left-animation 0.5s forwards'
          }
        }}
      >
        {title}
      </Typography>
  )
}

export default SectionTitle