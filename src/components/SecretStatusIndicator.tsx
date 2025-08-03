import { Box, Chip, Typography } from "@mui/material";
import { CheckCircle, Error, HourglassEmpty } from "@mui/icons-material";

interface SecretStatusIndicatorProps {
    secretName: string;
    loading: boolean;
    error: string | null;
    success: boolean;
}

export default function SecretStatusIndicator({
    secretName,
    loading,
    error,
    success,
}: SecretStatusIndicatorProps) {
    const getStatusColor = () => {
        if (loading) return "warning";
        if (error) return "error";
        if (success) return "success";
        return "default";
    };

    const getStatusIcon = () => {
        if (loading) return <HourglassEmpty />;
        if (error) return <Error />;
        if (success) return <CheckCircle />;
        return undefined;
    };

    const getStatusText = () => {
        if (loading) return "Loading...";
        if (error) return "Error";
        if (success) return "OK";
        return "Unknown";
    };

    if (success) {
        return null;
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <Typography variant="body2" sx={{ minWidth: "80px" }}>
                {secretName}:
            </Typography>
            <Chip
                icon={getStatusIcon()}
                label={getStatusText()}
                color={getStatusColor()}
                size="small"
                variant="outlined"
            />
            {error && (
                <Typography variant="caption" color="error" sx={{ ml: 1 }}>
                    {error}
                </Typography>
            )}
        </Box>
    );
}
