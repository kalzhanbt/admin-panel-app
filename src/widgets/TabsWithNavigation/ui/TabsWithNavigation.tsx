import { useNavigate, useLocation } from 'react-router-dom';

import { Box, Button } from "@mui/material";

const TabsWithNavigation = () => {

    const navigate = useNavigate();
    const location = useLocation();

    const categories = [
        {
            label: "Trucks",
            key: '/trucks',
        },
        {
            label: "Truck drivers",
            key: '/truck-drivers',
        },
    ]

    return (
        <Box
            sx={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
            }}
        >
            {
                categories.map((item) => (
                    <Button
                        size="small"
                        key={item.key}
                        onClick={() => navigate(item.key)}
                        variant={location.pathname === item.key ? 'contained' : 'outlined'}
                    >
                        {item.label}
                    </Button>
                ))
            }
        </Box>
    )
}

export default TabsWithNavigation;