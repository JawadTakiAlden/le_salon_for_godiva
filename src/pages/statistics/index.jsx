import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';
import { request } from '../../api/request';
import { useQuery } from '@tanstack/react-query';
import OrderCards from '../OrderCards';
import ReadyOrders from '../../components/ReadyOrders';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader';

ChartJS.register(ArcElement, Tooltip, Legend);

const getOrderRate = () => {
    return request({
        url : '/ordersRate'
    })
}

const getTimeStatsitics = () => {
    return request({
        url : '/ordersDelay'
    })
}



const Statistics = () => {

    const navigate = useNavigate()

    const orderRateQuery = useQuery({
        queryKey : ['get-order-rate-from-server'],
        queryFn : getOrderRate
    })
    const timeStatisticsQuery = useQuery({
        queryKey : ['get-time-statistics-from-server'],
        queryFn : getTimeStatsitics
    })

    if(orderRateQuery.isLoading || timeStatisticsQuery.isLoading){
        return <Loader/>
    }
    if(orderRateQuery.isError){
        if(orderRateQuery.error.response){
          if(orderRateQuery.error.response.status === 401){
            navigate('/signin')
          }
        }else if(orderRateQuery.error.request){
          return <Typography>Server Not Response With Anything</Typography>
        }else {
          return <Typography>Server Response With Unkonwn Error : {orderRateQuery.error.message}</Typography>
        }
      }

      if(timeStatisticsQuery.isError){
        if(timeStatisticsQuery.error.response){
          if(timeStatisticsQuery.error.response.status === 401){
            navigate('/signin')
          }
        }else if(timeStatisticsQuery.error.request){
          return <Typography>Server Not Response With Anything</Typography>
        }else {
          return <Typography>Server Response With Unkonwn Error : {timeStatisticsQuery.error.message}</Typography>
        }
      }

    const orderRate = orderRateQuery.data.data
    const timeStatistics = timeStatisticsQuery.data.data
    const data = {
        labels: ['average order rating' , 'average service rating' , 'delay time' , 'early time'],
        datasets: [
          {
            label: '#',
            data: [orderRate.avgOrderRate , orderRate.avgServiceRate , timeStatistics.avgDelayPercent , timeStatistics.avgEarlyPercent],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };

  return (
    <Box>
        <Box
            sx={{
                height : '500px',
                display : 'flex',
                justifyContent : 'center',
            }}
        >
            <Pie data={data} />
        </Box>

        <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'space-evenly'
            }}
        >
            <Box>
                <Typography
                    sx={{
                        fontSize : '28px',
                        color : '#D0B05C',
                        textTransform : 'uppercase',
                        textAlign : 'center'
                    }}
                >
                    avg delay time
                </Typography>
                <Typography
                    sx={{
                        textAlign : 'center',
                        color : 'white',
                        fontSize : '22px'
                    }}
                >
                    {timeStatistics.avgDelayTime}
                </Typography>
            </Box>
            <Box
                sx={{
                    marginTop : '15px'
                }}
            >
                <Typography
                    sx={{
                        fontSize : '28px',
                        color : '#D0B05C',
                        textTransform : 'uppercase',
                        textAlign : 'center'
                    }}
                >
                    avg early time
                </Typography>
                <Typography
                    sx={{
                        textAlign : 'center',
                        color : 'white',
                        fontSize : '22px'
                    }}
                >
                   {timeStatistics.avgEarlyTime}
                </Typography>
            </Box>
        </Box>
        <ReadyOrders />
    </Box>
  )
}

export default Statistics