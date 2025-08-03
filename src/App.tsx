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
    Alert,
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

function AppContent() {
    const [darkMode, setDarkMode] = useState(false);
    const { currentUser, logout } = useAuth();
    const { secrets, loading: secretsLoading, error: secretsError } = useSecrets();

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
                    {secretsLoading && (
                        <Alert severity="info" sx={{ mb: 2 }}>
                            Loading your secrets...
                        </Alert>
                    )}
                    
                    {secretsError && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            Error loading secrets: {secretsError}
                        </Alert>
                    )}
                    
                    {secrets && (
                        <Alert severity="success" sx={{ mb: 2 }}>
                            ✅ Secrets loaded successfully
                            {secrets.openai?.value && (
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    OpenAI API key: {secrets.openai.value.substring(0, 8)}...
                                </Typography>
                            )}
                        </Alert>
                    )}
                    
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
        <Provider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Provider>
    );
}

export default App;
