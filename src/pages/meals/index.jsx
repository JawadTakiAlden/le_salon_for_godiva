import { Alert, Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, Snackbar, TextField, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../../components/GridBox'
import GridItem from '../../components/GridItem'
import MealCard from '../../components/MealCard'
import AddButton from '../../components/AddButton'
import {Formik} from 'formik'
import * as Yup from 'yup'
import { request } from '../../api/request'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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


const getCategoryFromServer = () => {
    return request({
      url : '/categories'  
    })
}
const getMealsFromServer = () => {
    return request({
        url : '/meals'
    })
}

const addMealToServer = (values) => {
    return request({
        url : '/meals',
        method : 'Post',
        headers : {
            'Content-Type' : 'multipart/form-data'
        },
        data : values
    })
}

const Meals = () => {
    const [open, setOpen] = useState(false);
    const [AddFormOpen , setAddFormOpen] = useState(false)
    const [alterMessage, setAlterMessage] = useState(false);
    const [messageType , setMessageType] = useState('success')
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate()
    const [imagePreview, setImagePreview] = useState(null);


    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }


    const getMealsQuery = useQuery({
        queryKey : ['get-meals-from-server'],
        queryFn : getMealsFromServer
    })

    const getCategoryQuery = useQuery({
        queryKey : ['get-categoories-in-meals-page'],
        queryFn : getCategoryFromServer
    })


    const addMealMutation = useMutation({
        mutationKey : ['add-meal-to-category'],
        mutationFn : addMealToServer,
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
            setAlterMessage('a meal created successfully')
            setMessageType('success')
            setOpen(true)
            setAddFormOpen(false)
            setImagePreview(null)
            getMealsQuery.refetch()
        }
    })

    if(getMealsQuery.isLoading || getCategoryQuery.isLoading){
        return <Loader/>
    }

    if(getMealsQuery.isError){
        if(getMealsQuery.error.response){
          if(getMealsQuery.error.response.status === 401){
            navigate('/signin')
          }
        }else if(getMealsQuery.error.request){
          return <Typography>Server Not Response With Anything</Typography>
        }else {
          return <Typography>Server Response With Unkonwn Error : {getMealsQuery.error.message}</Typography>
        }
      }

      if(getCategoryQuery.isError){
        if(getCategoryQuery.error.response){
          if(getCategoryQuery.error.response.status === 401){
            navigate('/signin')
          }
        }else if(getCategoryQuery.error.request){
          return <Typography>Server Not Response With Antthing</Typography>
        }else {
          return <Typography>Server Response With Unkonwn Error : {getCategoryQuery.error.message}</Typography>
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

    const handleAddNewMeal = (values) => {
        let data = {
            name : values.name,
            description : values.description,
            image : values.imageFile,
            category_id : values.category_id,
            price : values.price
        }

        addMealMutation.mutate(data)
    }

    console.log(getMealsQuery.data.data)
    return (
      <>
        <Box>
            <AddButton reactionFunction={HandleFormClick}/>
            <GridBox spacing={2}>
                {
                    getMealsQuery.data.data.data.map(meal => (
                        <GridItem key={meal.id} xs={12} sm={6} md={4}lg={3} sx={{hright : '100%'}}>
                            <MealCard withActions={true} setMessageType={setMessageType} setAlterOpen={setOpen} setAlterMessage={setAlterMessage} data={meal} refetch={getMealsQuery.refetch} categories={getCategoryQuery.data.data.data}/>
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
        <Dialog 
            sx={{
              "& .MuiPaper-root" : {
                backgroundColor : '#2e2e2e',
                color : '#fff'
              }
            }}
        open={AddFormOpen} onClose={handleFormClose} maxWidth='xs'>
            <DialogTitle>New Meal</DialogTitle>
            <DialogContent>
                <Formik
                    onSubmit={handleAddNewMeal}
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
                                color='primary'
                            />
                            <TextField 
                                type='text'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                label="Description"
                                variant="outlined"
                                color='primary'
                            />
                            <TextField 
                                type='text'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.price}
                                name="price"
                                error={!!touched.price && !!errors.price}
                                helperText={touched.price && errors.price}
                                label="Price"
                                variant="outlined"
                                color='primary'
                            />
                            {/* <TextField 
                                type='file'
                                fullWidth 
                                sx={{ gridColumn: "span 4" }}
                                onBlur={handleBlur}
                                onChange={(e) => {
                                    setFieldValue('imageFile' , e.currentTarget.files[0])
                                    handleChange(e)
                                }}
                                value={values.image}
                                name="image"
                                error={!!touched.image && !!errors.image}
                                label="Image"
                                variant="outlined"
                            /> */}
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
                            <Select
                                value={values.category_id}
                                onChange={handleChange}
                                autoWidth
                                fullWidth
                                sx={{
                                    gridColumn: "span 4"
                                }}
                                label="Category"
                                name='category_id'
                                color='primary'
                                error={!!touched.category && !!errors.category}
                                >

                                {
                                    getCategoryQuery.data.data.data.map(category => (
                                        <MenuItem key ={category.id} value= { category.id }>{category.name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color='primary' variant="contained">
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
    price : '',
    description : '',
    image : '',
    imageFile : {},
    category_id : '',
    calories : ''
}

const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
    price : Yup.number().required('price field is requred'),
    description : Yup.string().required('description field is required'),
    image : Yup.string().required('image field is required'),
    category_id : Yup.string().required('category field is required'),
})

export default Meals