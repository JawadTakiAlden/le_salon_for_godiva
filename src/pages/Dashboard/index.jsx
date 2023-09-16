import { Box, Typography } from '@mui/material'
import React from 'react'
import StatisticsCards from './components/StatisticsCards'
import TopMeals from './components/TopMeals'
import { useQuery } from '@tanstack/react-query'
import { request } from '../../api/request'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loader'
import { GetErrorHandler } from '../../components/GetErrorHandlerHelper'

const getStatisticsFromServer = () => {
  return request({
    url : '/statistics'
  })
}

const getTopMealsFromServer = () => {
  return request({
    url : '/topMeals'
  })
}

const Dashboard = () => {
  const statisticsQuery = useQuery({
    queryKey  : ['get-statistics-from-serve'],
    queryFn : getStatisticsFromServer,
  })

  const TopMealsQuery = useQuery({
    queryKey  : ['get-top-meals-from-serve'],
    queryFn : getTopMealsFromServer
  })

  if(statisticsQuery.isLoading || TopMealsQuery.isLoading){
    return <Loader/>
  }

  if(statisticsQuery.isError){
    return <GetErrorHandler error={statisticsQuery.error} refetch={statisticsQuery.refetch} />
  }
  if(TopMealsQuery.isError){
    return <GetErrorHandler error={TopMealsQuery.error} refetch={TopMealsQuery.refetch} />
  }
  return (
    <Box>
        <StatisticsCards data={statisticsQuery?.data?.data} />
        <TopMeals data={TopMealsQuery?.data?.data?.data} />
    </Box>
  )
}

export default Dashboard