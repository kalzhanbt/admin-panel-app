import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, alpha } from "@mui/material";
import { HeaderRoot, HeaderContent } from "./Header.styles";

import ExitIcon from "@/assets/icons/Exit.icon.svg?react";

const Header = () => {
    const navigate = useNavigate();

    const isLogged = localStorage.getItem('accessToken');

    const logout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login')
    };

    return (
        <HeaderRoot>
            <Container maxWidth="xl">
                <HeaderContent>
                    <Link to="/">
                        Admin Panel
                    </Link>

                    {isLogged && (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: '24px',
                                alignItems: 'center',
                                color: (theme) => alpha(theme.palette.dark, 0.64)
                            }}
                        >
                            <Box
                                sx={{
                                    height: "28px",
                                    width: "1px",
                                    backgroundColor: (theme) => alpha(theme.palette.dark, 0.12)
                                }}
                            />
                            <ExitIcon onClick={() => logout()} style={{ cursor: "pointer" }} />
                        </Box>
                    )}
                </HeaderContent>
            </Container>
        </HeaderRoot>
    )
};

export default Header;