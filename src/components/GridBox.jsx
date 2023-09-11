import { Grid } from '@mui/material'
import React from 'react'

const GridBox = ({children , ...rest}) => {
  return (
    <Grid container {...rest}>
        {children}
    </Grid>
  )
}

export default GridBox