import { Box, IconButton, Rating, Typography } from '@mui/material'
import React, { useState } from 'react'
import OrderItem from './OrderItem'
import { KeyboardArrowDown, KeyboardArrowUp } from '@mui/icons-material'

const PastOrderCard = ({type , orderData}) => {
    const [isCardOpen , setIsCardOpen] = useState(false)
  return (
    <Box
        className={`order-card ${orderData.isNew && 'animated-rgb'}`}
        sx={{
            borderRadius : '8px',
            height : '100%',
            position : 'relative',
            cursor : 'pointer',
            padding : orderData.isNew ? '4px' : '0px'
        }}
        onClick={() => setIsCardOpen(!isCardOpen)}
    >
        <IconButton
                sx={{
                    position :'absolute',
                    left : '50%',
                    bottom : '-12.5px',
                    transform : 'translateX(-50%)',
                    backgroundColor : '#4E4E4E',
                    width : '25px',
                    height : '25px',
                    zIndex : '2',
                    "&:hover" : {
                        backgroundColor : '#3E3E3E',
                    }
                }}

                onClick={() => setIsCardOpen(!isCardOpen)}
            >
                <KeyboardArrowUp 
                    sx={{
                        color : 'white',
                        transition : '0.5s',
                        transform : isCardOpen ? 'rotate(0.5turn)' : '0'
                    }}
                />
            </IconButton>
        <Box
            className='order-card-header'
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'space-between',
                padding : '10px 15px',
                backgroundColor : type === 'waiting' ? '#BCBCBC' : type === 'ongoing' ?  '#FFDD83' : '#ffde83d1',
                flexWrap : 'wrap',
                borderRadius: '8px 8px 0px 0px'
            }}
        >

            <Typography
                sx={{
                    fontSize : {xs : '25px'}
                }}
            >
                Order ID : <b>{orderData?.id}</b>
            </Typography>
            <Box>
                <Typography
                    sx={{
                        fontSize : {xs : '20px'}
                    }}
                >
                    table : <b>{orderData?.table_id}</b>
                </Typography>
                <Typography
                    sx={{
                        fontSize : {xs : '20px'}
                    }}
                >
                    total : {orderData?.total}SAR
                </Typography>
                <Typography
                    sx={{
                        fontSize : {xs : '20px'},
                        display : 'flex',
                        alignItems : 'center'
                    }}
                >
                    order rate : <Rating name="read-only" value={orderData.order_rate} readOnly />
                </Typography>
                <Typography
                    sx={{
                        fontSize : {xs : '20px'},
                        display : 'flex',
                        alignItems : 'center'
                    }}
                >
                    service rate : <Rating name="read-only" value={orderData.order_rate} readOnly />
                </Typography>
            </Box>
        </Box>
        {
            orderData?.feedback && (
            <Box>
                    <Typography
                        sx={{
                            color : '#ffde83d1',
                            fontSize : '18px',
                            textTransform : 'capitalize'
                        }}
                    >
                        <b>feedback</b> : {orderData?.feedback}
                    </Typography>
                </Box>
            )
        }
        <Box
            className='order-card-body'
            sx={{
                backgroundColor : '#fff',
                height : '100%',
                transition : 'max-height 0.5s',
                maxHeight : !isCardOpen ? '1000px' : '0px',
                overflow : 'hidden',
                borderRadius: '0px 0px 8px 8px'
            }}
        >

            {
                orderData?.relationships?.ready_sub_orders?.map(subOrder => {
                    return subOrder?.relationship?.order_items?.map(orderItem => {
                        return <OrderItem key={orderItem.id} orderItemData={orderItem} />
                    })

                })
            }
        </Box>

    </Box>
  )
}

export default PastOrderCard