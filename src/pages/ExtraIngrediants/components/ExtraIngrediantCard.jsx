import { CheckOutlined, DeleteOutlined, EditOutlined, SaveOutlined } from '@mui/icons-material'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { request } from '../../../api/request'

const UpdateExtraInServer = (values) => {
    return request({
        url : '/test',
    })
}

const ExtraIngrediantCard = ({extraIngrediant , index}) => {
    const [name , setName] = useState('name of extra')
    const [price , setPrice] = useState('520')
    const [editMode , setEditMode] = useState(false)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const {mutate , isLoading , isSuccess} = useMutation({
        mutationKey : ['update-extra-in-server'],
        mutationFn : UpdateExtraInServer
    })

    const saveHandler = () => {
        mutate()
    }
  return (
    <>
    <Box
        sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'space-between',
            padding : '15px',
            gap : '10px',
            boxShadow : '0px 0px 14px -2px #1ebd28',
            transition : '0.3s',
            borderRadius : index / 2 === 0 ? '40px 0px 40px 0px' : '0px 40px 0px 40px',
            "&:hover" : {
                transform : 'scale(1.1)',
                borderRadius : index / 2 === 0 ? '0px 40px 0px 40px' : '40px 0px 40px 0px',
                zIndex : '1'
            }
        }}
    >
        <Box
            sx={{
                display : 'flex',
                gap : '10px',
                flexDirection : 'column'
            }}
        >
            <input 
                disabled={!editMode}
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                name='name'
                style={{
                    width : '100%',
                    padding : '6px 10px',
                    backgroundColor : 'transparent',
                    border : editMode ? '1px solid #1ebd28' : 'none',
                    color : 'white',
                    fontSize : '17px',
                    textTransform : 'capitalize',
                    borderRadius : '6px'
                }}

            />
            <input 
                disabled={!editMode}
                type='text'
                value={`${price}`}
                onChange={(e) => setPrice(e.target.value)}
                name='price'
                style={{
                    width : '100%',
                    padding : '6px 10px',
                    backgroundColor : 'transparent',
                    border : editMode ? '1px solid #1ebd28' : 'none',
                    color : '#1ebd28',
                    fontSize : '17px',
                    textTransform : 'capitalize',
                    borderRadius : '6px'
                }}
            />
        </Box>
        <Box
            sx={{
                display : 'flex',
                flexDirection : 'column',
                gap : '5px',
                position : 'relative'
            }}
        >
            {
                !editMode && (
                    <Fab
                        sx={{
                            backgroundColor : 'transparent',
                            "&:hover" : {
                                backgroundColor : 'transparent'
                            }
                        }}
                        onClick={() => setEditMode(true)}
                    >
                        <EditOutlined 
                            color='warning'
                        />
                    </Fab>
                )
            }
            {
                editMode && (
                    <Fab
                        sx={{
                            backgroundColor : 'transparent',
                            "&:hover" : {
                                backgroundColor : 'transparent'
                            }
                        }}
                        onClick={saveHandler}
                    >
                        <SaveOutlined 
                            color='success'
                        />
                    </Fab>
                )
            }
            
            {
                isLoading && (
                    <CircularProgress 
                        size={58}
                        sx={{
                            color : 'green',
                            position : 'absolute',
                            top : '0',
                            left : '-1px',
                            zIndex : '1'
                        }}
                        />
                )
            }
            <Fab
                sx={{
                    backgroundColor : 'transparent',
                    "&:hover" : {
                        backgroundColor : 'transparent'
                    }
                }}
                onClick={handleClickOpen}
            >
                <DeleteOutlined 
                    color='error'
                />
            </Fab>
        </Box>
    </Box>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
            Delete Extra Ingrediants
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure That You Want Delete This Item , This Action Can't Be Undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error' variant='outlined'>Disagree</Button>
          <Button onClick={handleClose} autoFocus color='success' variant='outlined'>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ExtraIngrediantCard