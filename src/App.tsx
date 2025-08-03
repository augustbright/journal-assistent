import { useState } from "react";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    Box,
    Container,
    Switch,
    FormControlLabel,
} from "@mui/material";

import {
    Brightness4,
    Brightness7,
} from "@mui/icons-material";
import PWABadge from "./PWABadge.tsx";

function App() {
    const [darkMode, setDarkMode] = useState(false);

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: {
                main: "#2196F3",
            },
            secondary: {
                main: "#f50057",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box
                sx={{
                    flexGrow: 1,
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* App Bar */}
                <AppBar position="static" elevation={0}>
                    <Toolbar>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            My Bot
                        </Typography>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={darkMode}
                                    onChange={(e) =>
                                        setDarkMode(e.target.checked)
                                    }
                                    color="default"
                                />
                            }
                            label={darkMode ? <Brightness7 /> : <Brightness4 />}
                        />
                        <PWABadge />
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
                    {/* Blank homepage */}
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
