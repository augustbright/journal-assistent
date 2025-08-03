import { useState } from "react";
import {
    ThemeProvider,
    createTheme,
    CssBaseline,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Container,
    Box,
    Card,
    CardContent,
    Button,
    TextField,
    List,
    Chip,
    Fab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Paper,
    Divider,
    Switch,
    FormControlLabel,
} from "@mui/material";

import {
    Brightness4,
    Brightness7,
    Add as AddIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Book as BookIcon,
    Search as SearchIcon,
    FilterList as FilterIcon,
    CalendarToday,
    AccessTime,
    Star,
    StarBorder,
} from "@mui/icons-material";
import PWABadge from "./PWABadge.tsx";

// Sample daily tasks and tools
const sampleEntries = [
    {
        id: 1,
        title: "Quick Calculator",
        content: "Calculate tip: 15% of $45.60 = $6.84, total = $52.44",
        date: "2024-01-15",
        time: "14:30",
        tags: ["calculator", "finance"],
        favorite: true,
    },
    {
        id: 2,
        title: "URL Shortener",
        content: "Long URL: https://example.com/very/long/url/that/needs/shortening",
        date: "2024-01-14",
        time: "16:45",
        tags: ["url", "utility"],
        favorite: false,
    },
    {
        id: 3,
        title: "Password Generator",
        content: "Generated: K9#mP$2xL@vR8qW",
        date: "2024-01-13",
        time: "09:15",
        tags: ["security", "password"],
        favorite: true,
    },
];

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [entries, setEntries] = useState(sampleEntries);
    const [searchTerm, setSearchTerm] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [newEntry, setNewEntry] = useState({
        title: "",
        content: "",
        tags: "",
    });

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

    const handleAddEntry = () => {
        if (newEntry.title && newEntry.content) {
            const entry = {
                id: Date.now(),
                title: newEntry.title,
                content: newEntry.content,
                date: new Date().toISOString().split("T")[0],
                time: new Date().toLocaleTimeString("en-US", {
                    hour12: false,
                    hour: "2-digit",
                    minute: "2-digit",
                }),
                tags: newEntry.tags
                    .split(",")
                    .map((tag) => tag.trim())
                    .filter((tag) => tag),
                favorite: false,
            };
            setEntries([entry, ...entries]);
            setNewEntry({ title: "", content: "", tags: "" });
            setOpenDialog(false);
        }
    };

    const toggleFavorite = (id: number) => {
        setEntries(
            entries.map((entry) =>
                entry.id === id
                    ? { ...entry, favorite: !entry.favorite }
                    : entry
            )
        );
    };

    const deleteEntry = (id: number) => {
        setEntries(entries.filter((entry) => entry.id !== id));
    };

    const filteredEntries = entries.filter(
        (entry) =>
            entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            entry.tags.some((tag) =>
                tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
    );

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
                        <BookIcon sx={{ mr: 2 }} />
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
                    {/* Search and Filter Section */}
                    <Paper sx={{ p: 3, mb: 3 }}>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 2,
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                        >
                            <Box sx={{ flexGrow: 1, minWidth: 200 }}>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    placeholder="Search tools and tasks..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    InputProps={{
                                        startAdornment: (
                                            <SearchIcon
                                                sx={{
                                                    mr: 1,
                                                    color: "text.secondary",
                                                }}
                                            />
                                        ),
                                    }}
                                />
                            </Box>
                            <Button
                                variant="outlined"
                                startIcon={<FilterIcon />}
                                onClick={() => setOpenDialog(true)}
                            >
                                Add Tool
                            </Button>
                        </Box>
                    </Paper>

                    {/* Stats Cards */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 3,
                            mb: 3,
                            flexWrap: "wrap",
                        }}
                    >
                        <Card sx={{ flex: "1 1 200px", minWidth: 200 }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Total Tools
                                </Typography>
                                <Typography variant="h4">
                                    {entries.length}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ flex: "1 1 200px", minWidth: 200 }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    Pinned
                                </Typography>
                                <Typography variant="h4">
                                    {entries.filter((e) => e.favorite).length}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ flex: "1 1 200px", minWidth: 200 }}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>
                                    This Week
                                </Typography>
                                <Typography variant="h4">
                                    {
                                        entries.filter((e) => {
                                            const entryDate = new Date(e.date);
                                            const now = new Date();
                                            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                                            return entryDate >= weekAgo;
                                        }).length
                                    }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Tools and Tasks */}
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>
                            Recent Tools & Tasks
                        </Typography>
                        {filteredEntries.length === 0 ? (
                            <Paper sx={{ p: 4, textAlign: "center" }}>
                                <Typography variant="h6" color="textSecondary">
                                    No tools found
                                </Typography>
                                <Typography color="textSecondary">
                                    {searchTerm
                                        ? "Try adjusting your search terms"
                                        : "Add your first tool or task!"}
                                </Typography>
                            </Paper>
                        ) : (
                            <List>
                                {filteredEntries.map((entry, index) => (
                                    <Box key={entry.id}>
                                        <Paper sx={{ mb: 2, p: 2 }}>
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    gap: 2,
                                                    alignItems: "flex-start",
                                                }}
                                            >
                                                <Box sx={{ flexGrow: 1 }}>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Typography
                                                            variant="h6"
                                                            sx={{ flexGrow: 1 }}
                                                        >
                                                            {entry.title}
                                                        </Typography>
                                                        <IconButton
                                                            size="small"
                                                            onClick={() =>
                                                                toggleFavorite(
                                                                    entry.id
                                                                )
                                                            }
                                                            color={
                                                                entry.favorite
                                                                    ? "primary"
                                                                    : "default"
                                                            }
                                                        >
                                                            {entry.favorite ? (
                                                                <Star />
                                                            ) : (
                                                                <StarBorder />
                                                            )}
                                                        </IconButton>
                                                    </Box>
                                                    <Typography
                                                        variant="body2"
                                                        color="textSecondary"
                                                        sx={{ mb: 1 }}
                                                    >
                                                        {entry.content}
                                                    </Typography>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 1,
                                                            mb: 1,
                                                        }}
                                                    >
                                                        <Chip
                                                            icon={
                                                                <CalendarToday />
                                                            }
                                                            label={entry.date}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                        <Chip
                                                            icon={
                                                                <AccessTime />
                                                            }
                                                            label={entry.time}
                                                            size="small"
                                                            variant="outlined"
                                                        />
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            gap: 0.5,
                                                            flexWrap: "wrap",
                                                        }}
                                                    >
                                                        {entry.tags.map(
                                                            (tag, tagIndex) => (
                                                                <Chip
                                                                    key={
                                                                        tagIndex
                                                                    }
                                                                    label={tag}
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                />
                                                            )
                                                        )}
                                                    </Box>
                                                </Box>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <IconButton
                                                        size="small"
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        size="small"
                                                        color="error"
                                                        onClick={() =>
                                                            deleteEntry(
                                                                entry.id
                                                            )
                                                        }
                                                    >
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </Box>
                                            </Box>
                                        </Paper>
                                        {index < filteredEntries.length - 1 && (
                                            <Divider />
                                        )}
                                    </Box>
                                ))}
                            </List>
                        )}
                    </Box>
                </Container>

                {/* Floating Action Button */}
                <Fab
                    color="primary"
                    aria-label="add"
                    sx={{ position: "fixed", bottom: 16, right: 16 }}
                    onClick={() => setOpenDialog(true)}
                >
                    <AddIcon />
                </Fab>

                {/* Add Entry Dialog */}
                <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Add New Tool or Task</DialogTitle>
                    <DialogContent>
                                                    <TextField
                                autoFocus
                                margin="dense"
                                label="Title"
                                fullWidth
                                variant="outlined"
                                value={newEntry.title}
                                onChange={(e) =>
                                    setNewEntry({
                                        ...newEntry,
                                        title: e.target.value,
                                    })
                                }
                                placeholder="Calculator, URL shortener, reminder..."
                                sx={{ mb: 2 }}
                            />
                                                    <TextField
                                margin="dense"
                                label="Content"
                                fullWidth
                                multiline
                                rows={4}
                                variant="outlined"
                                value={newEntry.content}
                                onChange={(e) =>
                                    setNewEntry({
                                        ...newEntry,
                                        content: e.target.value,
                                    })
                                }
                                placeholder="Add your tool output, task details, or notes here..."
                                sx={{ mb: 2 }}
                            />
                                                    <TextField
                                margin="dense"
                                label="Tags (comma-separated)"
                                fullWidth
                                variant="outlined"
                                value={newEntry.tags}
                                onChange={(e) =>
                                    setNewEntry({
                                        ...newEntry,
                                        tags: e.target.value,
                                    })
                                }
                                placeholder="calculator, utility, finance, reminder"
                            />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenDialog(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleAddEntry} variant="contained">
                            Add Tool
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </ThemeProvider>
    );
}

export default App;
