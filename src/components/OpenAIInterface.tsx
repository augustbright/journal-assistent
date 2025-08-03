import { useState } from "react";
import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useAtomValue } from "jotai";
import { openaiApiKeyAtom } from "../atoms/secrets";
import { OpenAIService } from "../services/openaiService";
import { Action } from "../types/actions";
import ActionDisplay from "./ActionDisplay";

interface OpenAIError {
    response?: {
        data?: {
            error?: {
                message?: string;
            };
        };
    };
    message?: string;
}

export default function OpenAIInterface() {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState<string>("");
    const [actions, setActions] = useState<Action[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string>("");
    const openaiApiKey = useAtomValue(openaiApiKeyAtom);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!prompt.trim()) {
            setError("Please enter some text");
            return;
        }

        if (!openaiApiKey) {
            setError(
                "OpenAI API key not found. Please check your secrets configuration."
            );
            return;
        }

        try {
            setLoading(true);
            setError("");
            setResponse("");
            setActions([]);

            // Using the prompt ID from your curl example
            const result = await OpenAIService.generateResponseWithPromptId(
                openaiApiKey,
                "pmpt_688f8ad66f148190be5af55d2d5f3bec08612d69fdddd2b3",
                prompt,
                "1"
            );

            setResponse(JSON.stringify(result, null, 2));

            // Parse actions from response
            try {
                const responseText = result.output?.[0]?.content?.[0]?.text;
                if (responseText) {
                    const parsedActions = JSON.parse(responseText);
                    const actionsArray = Array.isArray(parsedActions)
                        ? parsedActions
                        : [parsedActions];
                    setActions(actionsArray);
                }
            } catch (parseError) {
                console.error("Error parsing actions:", parseError);
                setActions([]);
            }
        } catch (err: unknown) {
            const error = err as OpenAIError;
            console.error("OpenAI API error:", error);
            setError(
                error.response?.data?.error?.message ||
                    error.message ||
                    "Failed to call OpenAI API"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
                OpenAI API Interface
            </Typography>

            {!openaiApiKey && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    OpenAI API key not available. Please check your Firestore
                    secrets configuration.
                </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    label="Enter your text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={loading || !openaiApiKey}
                    sx={{ mb: 2 }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading || !openaiApiKey || !prompt.trim()}
                    sx={{ mb: 2 }}
                >
                    {loading ? (
                        <CircularProgress size={20} />
                    ) : (
                        "Send with Prompt ID"
                    )}
                </Button>
            </Box>

            {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                    {error}
                </Alert>
            )}

            {response && (
                <Box sx={{ mt: 3 }}>
                    <Typography variant="subtitle2" gutterBottom>
                        Raw Response:
                    </Typography>
                    <Paper
                        variant="outlined"
                        sx={{
                            p: 2,
                            backgroundColor: "#f5f5f5",
                            maxHeight: "300px",
                            overflow: "auto",
                            fontFamily: "monospace",
                            fontSize: "0.875rem",
                        }}
                    >
                        {response}
                    </Paper>
                </Box>
            )}
            
            {/* Display parsed actions */}
            <ActionDisplay actions={actions} />
        </Paper>
    );
}
