import { Box, Container } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const AuthLayout = () => {
  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box sx={{
           marginTop: 8,
           display: "flex",
           alignItems: "center",
           flexDirection: "column"
        }}
        >
          Notion
        </Box>
      </Container>
      <Outlet />
    </div>
    
  )
}
