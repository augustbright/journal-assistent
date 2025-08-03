import { useState, useEffect } from "react";
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
    Button,
} from "@mui/material";

import {
    Brightness4,
    Brightness7,
    Logout as LogoutIcon,
} from "@mui/icons-material";
import PWABadge from "./PWABadge.tsx";
import { analytics } from "./firebase.ts";
import { AuthProvider, useAuth } from "./contexts/AuthContext.tsx";
import Login from "./components/Login.tsx";

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const { currentUser, logout } = useAuth();

    // Initialize Firebase Analytics
    useEffect(() => {
        // Log app initialization
        if (analytics) {
            console.log("Firebase Analytics initialized");
        }
    }, []);

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

    // If user is not authenticated, show login
    if (!currentUser) {
        return (
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Login />
            </ThemeProvider>
        );
    }

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
                        <Button
                            color="inherit"
                            onClick={logout}
                            startIcon={<LogoutIcon />}
                            sx={{ ml: 2 }}
                        >
                            Logout
                        </Button>
                        <PWABadge />
                    </Toolbar>
                </AppBar>

                {/* Main Content */}
                <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
                    {/* Blank homepage */}
                    <Typography variant="h5" gutterBottom>
                        Welcome, {currentUser.email}!
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                        Your personal automation tools will appear here.
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;
