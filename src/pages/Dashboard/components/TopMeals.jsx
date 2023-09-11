import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import GridBox from '../../../components/GridBox'
import GridItem from '../../../components/GridItem'
import MealCard from '../../../components/MealCard'
import SectionTitle from '../../../components/SectionTitle'
import { DoubleArrow } from '@mui/icons-material'
import { Link } from 'react-router-dom'


const TopMeals = ({data}) => {
  return (
    <Box
      sx={{
        padding : '0 20px'
      }}
    >
      <SectionTitle title={'latest meals'} />
      <GridBox spacing={2}>
        {
          data?.map(meal => (
            <GridItem xs={12} sm={6}>
              <MealCard key={meal.id} data={meal} withActions={false} />
            </GridItem>
          ))
        }
      </GridBox>
      <Box
        sx={{
          display : 'flex',
          justifyContent : 'center',
          alignItems : 'center',
          marginTop : '20px'
        }}
      >
        <IconButton
          color='primary'
          LinkComponent={Link}
          to={'/meals'}
        >
          <DoubleArrow 
            sx={{
              color : '#00a1c9',
              fontSize : '35px',
            }}
          />
        </IconButton>
      </Box>
    </Box>
  )
}

export default TopMeals