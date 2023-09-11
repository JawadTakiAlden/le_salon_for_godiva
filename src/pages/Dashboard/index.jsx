import { Box, Typography } from '@mui/material'
import React from 'react'
import StatisticsCards from './components/StatisticsCards'
import TopMeals from './components/TopMeals'
import { useQuery } from '@tanstack/react-query'
import { request } from '../../api/request'
import { useNavigate } from 'react-router'
import Loader from '../../components/Loader'

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
  const navigate = useNavigate()
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
    if(statisticsQuery.error.response){
      if(statisticsQuery.error.response.status == 401){
        navigate('/signin')
      }
    }else if(statisticsQuery.error.request){
      return <Typography>Server Not Response With Antthing</Typography>
    }else {
      return <Typography>Server Response With Unkonwn Error : {statisticsQuery.error.message}</Typography>
    }
  }

  if(TopMealsQuery.isError){
    if(TopMealsQuery.error.response){
      if(TopMealsQuery.error.response.status == 401){
        navigate('/signin')
      }
    }else if(TopMealsQuery.error.request){
      return <Typography>Server Not Response With Antthing</Typography>
    }else {
      return <Typography>Server Response With Unkonwn Error : {TopMealsQuery.error.message}</Typography>
    }
  }

  return (
    <Box>
        <StatisticsCards data={statisticsQuery?.data?.data} />
        <TopMeals data={TopMealsQuery?.data?.data?.meals} />
    </Box>
  )
}

export default Dashboard