import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const TeacherStatus = () => {

  return (
      <React.Fragment>
    <Box 
      mr={3}
      sx={{
        background: "#ffffff",
        position: "absolute",
        boxShadow: "0px 3px 5px rgba(0, 0, 0, 0.11)",
        borderRadius: "8px",
        width: "120px",
        right: 15,
        top: 0,
        zIndex: 999,
      }}
    >
      <Typography
        px={2}
        py={2}
        fontSize="14px"
        fontWeight="600"
        sx={{ cursor: "pointer" }}
      >
        Active
      </Typography>
      <Divider />
      <Typography
        px={2}
        py={2}
        fontSize="14px"
        fontWeight="600"
        sx={{ cursor: "pointer" }}
      >
        Inactive
      </Typography>
    </Box>
    
   
  </React.Fragment>
  )
}

export default TeacherStatus