import { AddOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React from 'react'

const AddButton = ({color , reactionFunction}) => {
  return (
    <>
    <Box
        sx={{
            marginBottom : '10px',
            display : 'flex',
            alignItems : 'center',
            border : `1px solid #00a1c9`,
            borderRadius : '6px',
            transition : '0.4s',
            transformOrigin : 'bottom left',
            position : 'relative',
            width : 'fit-content',
            "&::after" : {
                content : "''",
                position : 'absolute',
                width  : '10px',
                height : '10px',
                borderRadius : '50%',
                left : '0',
                top : '-10px',
                backgroundColor : '#00a1c9',
                transition : '0.4s'
            },
            "&:hover" : {
                transform : 'rotate(4deg)',
                paddingRight : '10px',
                "& .my-text" : {
                    maxWidth : '50px'
                }
            },
            "&:hover::after" : {
                left : 'calc(100% - 20px)'
            },
            "&::before" : {
                content : "''",
                position : 'absolute',
                width : '2px',
                height : '0',
                backgroundColor : `#fff`,
                transition : '0.4s',
                right : '8px',
                top : '-10px',
            },
            "&:hover::before" :{
                top : '-10px',
                height : '10px'
            }
        }}
        onClick={() => reactionFunction()}
    >
        <IconButton
            sx={{
                borderRadius : '0px',
                width : '40px',
                height : '40px',
                backgroundColor : 'transparent',
                "&:hover" : {
                    backgroundColor : 'transparent'
                }
            }}
            onClick={() => reactionFunction()}
        >
            <AddOutlined 
                sx={{
                    color : `#00a1c9`
                }}
            />
        </IconButton>
        <Typography
            className='my-text'
            sx={{
                maxWidth : '0px',
                transition : '0.4s',
                overflow : 'hidden',
                color : '#fff',
                cursor : 'pointer'
            }}
            onClick={() => reactionFunction()}
        >
            new
        </Typography>
    </Box>
    </>
  )
}

export default AddButton