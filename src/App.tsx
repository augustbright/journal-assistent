import { useState, useEffect } from "react";
import { Provider } from "jotai";
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
import { useSecrets } from "./hooks/useSecrets.ts";
import OpenAIInterface from "./components/OpenAIInterface.tsx";
import SecretStatusIndicator from "./components/SecretStatusIndicator.tsx";

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const { currentUser, logout } = useAuth();
    const {
        secrets,
        loading: secretsLoading,
        error: secretsError,
        openaiLoading,
        openaiError,
        openaiSuccess,
    } = useSecrets();

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
                    {/* Welcome message */}
                    <Typography variant="h5" gutterBottom>
                        Welcome, {currentUser.email}!
                    </Typography>

                    {/* Secrets status */}
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Secrets Status
                        </Typography>

                        {/* Individual secret status indicators */}
                        <SecretStatusIndicator
                            secretName="OpenAI"
                            loading={openaiLoading}
                            error={openaiError}
                            success={openaiSuccess}
                        />

                        {/* General secrets status */}
                        {secretsLoading && (
                            <Typography variant="caption" color="info.main">
                                Loading secrets from Firestore...
                            </Typography>
                        )}

                        {secretsError && (
                            <Typography variant="caption" color="error">
                                General error: {secretsError}
                            </Typography>
                        )}

                        {secrets && openaiSuccess && (
                            <Typography variant="caption" color="success.main">
                                All secrets loaded successfully
                            </Typography>
                        )}
                    </Box>

                    <Typography
                        variant="body1"
                        color="textSecondary"
                        sx={{ mb: 3 }}
                    >
                        Your personal automation tools will appear here.
                    </Typography>

                    {/* OpenAI Interface */}
                    <OpenAIInterface />
                </Container>
            </Box>
        </ThemeProvider>
    );
}

function App() {
    return (
        <Provider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Provider>
    );
}

export default App;
