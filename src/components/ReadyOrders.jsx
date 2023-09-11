import React from 'react'
import PastOrderCard from './PastOrderCard'
import GridItem from '../components/GridItem'
import GridBox from '../components/GridBox'
import { Box, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { request } from '../api/request'

const getPastOrder = () => {
    return request({
        url : '/past-orders'
    })
}

const ReadyOrders = () => {
    const {data , isLoading , isError , error } = useQuery({
      queryKey : ['get-orders-card-from-server'],
      queryFn : getPastOrder
    })

    if(isLoading){
        return 'loading ...'
    }

    if(isError){
        return 'error'
    }
  return (
    <Box
        sx={{
            width : '100%',
            backgroundColor : 'transparent',
            padding : '20px 10px',
            minHeight : 'calc(100vh - 180px)',
        }}
    >
        <GridBox spacing={2}>
            {
                data?.data?.data?.length === 0
                ? (
                    <Typography
                        sx={{
                            color : '#D0B05C',
                            textAlign : 'center',
                            width : '100%',
                            fontSize : '30px',
                            textTransform : 'capitalize'
                        }}
                    >
                        no past orders until now
                    </Typography>
                )
                : (
                    data?.data?.data?.map((orderCard , i) => (
                        <GridItem key={i} sx={{height : '100%'}} key={orderCard.order_id} xs={12} md={6}>
                            <PastOrderCard type={'ready'} orderData = {orderCard} />
                        </GridItem>
                    ))
                )
            }
        </GridBox>
    </Box>
  )
}

export default ReadyOrders