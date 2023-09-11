import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box, IconButton, Typography } from '@mui/material';
import { ArrowOutward, Delete, DeleteOutlined } from '@mui/icons-material';
import { request } from '../../api/request';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Loader from '../../components/Loader';


const columns = [
    { field: 'id', headerName: 'ID', width: 50 },
    { field: 'table_id', headerName: 'Table ID', width : 100 },
    { field: 'total', headerName: 'Total', width : 100},
    { field: 'state', headerName: 'State', width : 150 , align : 'center' , headerAlign : 'center',
        renderCell : (params) => (
            <Box>
                <Typography
                    sx={{
                        color : 'white',
                        padding : '4px 16px',
                        backgroundColor : params.row.order_state === 1 ? '#9eb5ff' : params.row.order_state === 2 ? '#ffe32c' : params.row.order_state === 3 ? '#a658ff' : '#239b16',
                        borderRadius : '20px'
                    }}
                >
                    {params.row.order_state === 1 ? 'waiting' : params.row.order_state === 2 ? 'new' : params.row.order_state === 3 ? 'on going' : 'ready'}
                </Typography>
            </Box>
        )
    },
    { field: 'actions', type : 'actions' , headerName: 'Action', width : 200 ,  
        renderCell : (params) => (
            <Box>
                <IconButton>
                    <ArrowOutward color='warning' />
                </IconButton>
                <IconButton>
                    <DeleteOutlined color='error' />
                </IconButton>
            </Box>
        )
    },
];

const getOrdersFromServer = () => {
    return request({
        url : '/orders'
    })
}

const Orders = () => {

    const navigate = useNavigate()
    const ordersQuery = useQuery({
        queryKey : ['get-orders-from-server'],
        queryFn : getOrdersFromServer
    })

    if(ordersQuery.isLoading){
        return <Loader/>
    }

    if(ordersQuery.isError){
        if(ordersQuery.error.response){
          if(ordersQuery.error.response.status === 401){
            navigate('/signin')
          }
        }else if(ordersQuery.error.request){
          return <Typography>Server Not Response With Nothing</Typography>
        }else {
          return <Typography>Server Response With Unkonwn Error : {ordersQuery.error.message}</Typography>
        }
      }
  return (
    <Box 
        sx={{
        height: 300,
        maxWidth: '100%',
      }}
    >
        <DataGrid 
            rows={ordersQuery.data.data.data} 
            columns={columns}
            sx={{
                boxShadow: 2,
                border: 2,
                width : '100%',
                borderColor: 'gray',
                "& .MuiDataGrid-columnHeaders":{

                },
                "& .MuiToolbar-root" : {
                    color : 'white',
                    "& .MuiSvgIcon-root" : {
                        color : 'white'
                    }
                },
                '& .MuiDataGrid-cell:hover': {
                  color: '#f6c566',
                },
                "& .MuiDataGrid-cell" : {
                    color : 'white',
                    transition : '0.3s'
                },
                "& .MuiDataGrid-columnHeader" : {
                    color : 'white'
                },
                "& .MuiDataGrid-overlay" : {
                    backgroundColor : 'transparent',
                    color : 'white'
                }
            }}
        />
    </Box>
  )
}

export default Orders