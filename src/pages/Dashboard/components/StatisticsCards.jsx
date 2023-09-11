import React from 'react'
import GridBox from '../../../components/GridBox'
import GridItem from '../../../components/GridItem'
import StatisticsCard from './StatisticsCard'
import { Box } from '@mui/material'

const StatisticsCards = ({data}) => {
  return (
    <Box
        sx={{
            marginBottom : '30px'
        }}
    >
        <GridBox spacing={2}>
            <GridItem xs={12} sm={6} md={3}>
                <StatisticsCard title={'meals'} value={data?.meals} />
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <StatisticsCard title={'categories'} value={data?.categories} />
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <StatisticsCard title={'tables'} value={data?.tables} />
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
                <StatisticsCard title={'seals'} value={data?.seals}  />
            </GridItem>
        </GridBox>
    </Box>
  )
}

export default StatisticsCards