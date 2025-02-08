import React from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const ShowHistoryPage = ({ onClick }) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            position="relative"
            overflow="hidden"
        >
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2 }}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(45deg,rgb(251, 122, 150) 30%,rgb(249, 151, 99) 80%)',
                    zIndex: -1,
                    animation: 'gradientFlow 5s ease infinite'
                }}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={onClick}
                sx={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    color: 'white',
                    backgroundColor: '#007BFF',
                    borderRadius: '5px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'background-color 0.3s ease, transform 0.3s ease',
                    '&:hover': {
                        backgroundColor: '#0056b3',
                        transform: 'translateY(-2px)',
                    },
                    '&:active': {
                        backgroundColor: '#004085',
                        transform: 'translateY(0)',
                    },
                }}
            >
                Show History
            </Button>
        </Box>
    );
}

export default ShowHistoryPage;