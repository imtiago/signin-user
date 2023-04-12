import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

import { Box, BoxProps } from '@mui/material'

interface ICustomAvatar extends BoxProps {}
const CustomAvatar = ({}: ICustomAvatar) => {
    return (
        <Box
            width={100}
            height={100}
            borderRadius="50%"
            bgcolor="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <AccountCircleIcon fontSize="large" color="primary" />
        </Box>
    )
}

export default CustomAvatar
