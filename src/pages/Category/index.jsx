import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../../components/GridBox'
import GridItem from '../../components/GridItem'
import CategoryCard from '../../components/CategoryCard'
import AddButton from '../../components/AddButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { request } from '../../api/request'
import { useMutation, useQuery } from '@tanstack/react-query'
import Loader from '../../components/Loader'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate } from 'react-router'

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;


const getCategoriesFromServer = () => {
    return request({
        url : '/categories'
    })
}

const addCategoryToServer = (values) => {
    return request({
        url : '/categories',
        method  : 'POST',
        headers : {
            "Content-Type": "multipart/form-data",
        },
        data : values
    })
}

const Categories = () => {
    const [open, setOpen] = useState(false);
    const [AddFormOpen , setAddFormOpen] = useState(false)
    const [alterMessage, setAlterMessage] = useState(false);
    const [messageType , setMessageType] = useState('success')
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate()


    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }

    const categoriesQuery = useQuery({
        queryKey : ['get-categories-from-server'],
        queryFn : getCategoriesFromServer
    })

    const addCategoruMutation = useMutation({
        mutationKey : ['add-category-to-server'],
        mutationFn : addCategoryToServer,
            onError : (error) => {
                if (error.response){
                  switch(error.response.status){
                    case 401 : {
                      setAlterMessage('you are not authorize to make this action')
                      setMessageType('error')
                      setOpen(true)
                      break
                    }
                    case 422 : {
                      setAlterMessage('there are some issues with your data')
                      setMessageType('error')
                      setOpen(true)
                      break
                    }
                    case 500 : {
                      setAlterMessage('we have a problem in our server , come later')
                      setMessageType('error')
                      setOpen(true)
                      break
                    }
                    case 404 : {
                      setAlterMessage("we out of space , we can't find your destenation")
                      setMessageType('error')
                      setOpen(true)
                      break
                    }
                    default : {
                      setAlterMessage("unkown error accoure : request falid with status code" + error.response.status)
                      setMessageType('error')
                      setOpen(true)
                      break
                    }
                  }
                }else if(error.request){
                  setAlterMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
                  setMessageType('error')
                  setOpen(true)
                }else {
                  setAlterMessage('unknow error : ' + error.message)
                  setMessageType('error')
                  setOpen(true)
                }
              },
        onSuccess : () => {
            setAlterMessage('category created successfully')
            setMessageType('success')
            setOpen(true)
            handleFormClose()
            setImagePreview(null)
            categoriesQuery.refetch()
        }
    })

    const handleAddNewCategory = (values) => {
        console.log(values)
        const categoryValues = {
            name : values.name,
            image : values.imageFile
        }
        addCategoruMutation.mutate(categoryValues)
    }

    if(categoriesQuery.isLoading){
        return <Loader />
    }

    if(categoriesQuery.isError){
        if(categoriesQuery.error.response){
          if(categoriesQuery.error.response.status == 401){
            navigate('/signin')
          }
        }else if(categoriesQuery.error.request){
          return <Typography>Server Not Response With Anything</Typography>
        }else {
          return <Typography>Server Response With Unkonwn Error : {categoriesQuery.error.message}</Typography>
        }
      }

    const handleAlterClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const handleFormClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setAddFormOpen(false);
    };

    const HandleFormClick = () => {
        setAddFormOpen(true)
    }


    if(addCategoruMutation.isLoading){
        return <Loader />
    }

  return (
    <>
        <Box>
            <AddButton reactionFunction={HandleFormClick}/>
            <GridBox spacing={2}>
                {
                    categoriesQuery.data.data.data.map(category => (
                        <GridItem key={category.id} xs={12} sm={6} md={4} lg={3} sx={{height : '100%'}}>
                            <CategoryCard data={category} setAlterMessage={setAlterMessage} setMessageType={setMessageType} setAlterOpen={setOpen} refetch={categoriesQuery.refetch} />
                        </GridItem>
                    ))
                }
            </GridBox>
        </Box>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleAlterClose}>
            <Alert onClose={handleAlterClose} severity={messageType} sx={{ width: '100%' }}>
                {alterMessage}
            </Alert>
        </Snackbar>
        <Dialog open={AddFormOpen} onClose={handleFormClose} maxWidth='md'>
            <DialogTitle>New Meal</DialogTitle>
            <DialogContent>
                <Formik
                    onSubmit={handleAddNewCategory}
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                >
                    {
                    (
                        {
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                        setFieldValue
                        }
                    ) => (
                        <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <TextField 
                                type='text'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.name}
                                name="name"
                                error={!!touched.name && !!errors.name}
                                helperText={touched.name && errors.name}
                                label="Name"
                                variant="outlined"
                            />
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUploadIcon />}
                                href="#file-upload"
                                fullWidth
                                sx={{
                                    gridColumn: "span 4"
                                }}
                            >
                                Upload a file
                                <VisuallyHiddenInput onChange={(e) => {
                                    setFieldValue('imageFile' , e.currentTarget.files[0])
                                    handleChange(e)
                                    handleSelectImage(e)
                                }} type="file" name="image" value={values.image} />
                            </Button>
                            {
                                imagePreview && (
                                    <Box
                                        sx={{
                                            gridColumn: "span 4"
                                        }}
                                    >
                                    <img 
                                        src={imagePreview}
                                        style={{
                                            width : '100%',
                                            borderRadius :'10px',
                                            border : '1px dotted #888'
                                        }}
                                    />
                                    </Box>
                                )
                            }
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="success" variant="contained">
                                add
                            </Button>
                        </Box>
                        </form>
                        )
                    }
                </Formik>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleFormClose}>Cancel</Button>
            </DialogActions>
      </Dialog>
    </>
  )
}


const initialValues = {
    name : '',
    image : '',
    imageFile : {},
}

const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
    image : Yup.string().required('image field is required'),
})

export default Categories