import React, { useEffect } from "react";
import { Box, Collapse, CssBaseline, Typography } from "@mui/material";

const Home = () => {
    const [flag, setFlag] = React.useState(false);
    useEffect(() => {
        setFlag(true);
    }, [])
    return (
        <Box
            component="div"
            sx={{
                minHeight: '100vh',
                backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/home.jpeg"})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
            }}
        >
            <CssBaseline />
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alginItems: 'center',
                    height: '100vh'
                }}
            >
                <Collapse
                    in={flag}
                    {...(flag ? { timeout: 1000 } : {})}
                >
                    <Typography
                        mt={30}
                        variant="h2"
                        color="#ffffff"
                        fontWeight="bold"
                    > Welcome to 
                        <Typography variant="h2" fontWeight="bold" color="#5aff3d">
                            EzMeet!
                        </Typography>
                    </Typography>
                </Collapse>
            </Box>
        </Box>
    )
}

export default Home;