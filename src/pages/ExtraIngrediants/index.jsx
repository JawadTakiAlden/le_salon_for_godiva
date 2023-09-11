import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, TextField, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../../components/GridBox'
import GridItem from '../../components/GridItem'
import ExtraIngrediantCard from './components/ExtraIngrediantCard'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AddButton from '../../components/AddButton'

const ExtraIngrediants = () => {
    const [openAlterOpen, setOpenAlterOpen] = useState(false);
    const [AddFormOpen , setAddFormOpen] = useState(false)
    const [message, setMessage] = useState(false);
    const [severity , setSeverity] = useState('success')
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleAlterClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenAlterOpen(false);
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
        console.log(values)
    }

  return (
    <>
        <Box
            padding={"20px"}
        >
            <AddButton reactionFunction={HandleFormClick}/>
            <GridBox spacing={4} mt={1}>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <ExtraIngrediantCard index={0} />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <ExtraIngrediantCard index={1} />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <ExtraIngrediantCard index={1} />
                </GridItem>
                <GridItem xs={12} sm={6} md={4} lg={3}>
                    <ExtraIngrediantCard index={1} />
                </GridItem>
            </GridBox>
        </Box>
        <Snackbar open={openAlterOpen} autoHideDuration={4000} onClose={handleAlterClose}>
            <Alert onClose={handleAlterClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <Dialog open={AddFormOpen} onClose={handleFormClose} maxWidth='md'>
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
                                variant="filled"
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
                                variant="filled"
                            />
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
    price : '',
}

const validationSchema = Yup.object({
    name : Yup.string().required('name field is required'),
    price : Yup.number().required('price field is requred'), 
})

export default ExtraIngrediants