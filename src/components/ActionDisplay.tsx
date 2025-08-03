import { Box, Paper, Typography, Chip, LinearProgress } from "@mui/material";
import { Action, isFoodAction, isMoodAction, isPaymentAction } from "../types/actions";

interface ActionDisplayProps {
    actions: Action[];
}

export default function ActionDisplay({ actions }: ActionDisplayProps) {
    const renderFoodAction = (action: Action) => {
        if (!isFoodAction(action)) return null;
        
        return (
            <Paper key={`${action.action}-${action.time}`} sx={{ p: 2, mb: 2, borderLeft: 4, borderColor: 'success.main' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip label="Food" color="success" size="small" sx={{ mr: 1 }} />
                    <Typography variant="h6">{action.name}</Typography>
                </Box>
                
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 1 }}>
                    <Box>
                        <Typography variant="body2" color="textSecondary">Calories</Typography>
                        <Typography variant="body1">{action.calories} kcal</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="textSecondary">Carbs</Typography>
                        <Typography variant="body1">{action.carbs}g</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="textSecondary">Sugar</Typography>
                        <Typography variant="body1">{action.sugar}g</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="textSecondary">Fats</Typography>
                        <Typography variant="body1">{action.fats}g</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="textSecondary">Protein</Typography>
                        <Typography variant="body1">{action.protein}g</Typography>
                    </Box>
                    <Box>
                        <Typography variant="body2" color="textSecondary">Fiber</Typography>
                        <Typography variant="body1">{action.fiber}g</Typography>
                    </Box>
                </Box>
                
                <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
                    {new Date(action.time).toLocaleString()}
                </Typography>
            </Paper>
        );
    };

    const renderMoodAction = (action: Action) => {
        if (!isMoodAction(action)) return null;
        
        return (
            <Paper key={`${action.action}-${action.time}`} sx={{ p: 2, mb: 2, borderLeft: 4, borderColor: 'info.main' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip label="Mood" color="info" size="small" sx={{ mr: 1 }} />
                    <Typography variant="h6">Mood Analysis</Typography>
                </Box>
                
                <Typography variant="body2" sx={{ mb: 2, fontStyle: 'italic' }}>
                    "{action.quote}"
                </Typography>
                
                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Happiness</Typography>
                        <Typography variant="body2">{action.happiness}/10</Typography>
                    </Box>
                    <LinearProgress 
                        variant="determinate" 
                        value={action.happiness * 10} 
                        color="success"
                        sx={{ mb: 1 }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Sadness</Typography>
                        <Typography variant="body2">{action.sadness}/10</Typography>
                    </Box>
                    <LinearProgress 
                        variant="determinate" 
                        value={action.sadness * 10} 
                        color="primary"
                        sx={{ mb: 1 }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Anger</Typography>
                        <Typography variant="body2">{action.anger}/10</Typography>
                    </Box>
                    <LinearProgress 
                        variant="determinate" 
                        value={action.anger * 10} 
                        color="error"
                        sx={{ mb: 1 }}
                    />
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                        <Typography variant="body2">Stress</Typography>
                        <Typography variant="body2">{action.stress}/10</Typography>
                    </Box>
                    <LinearProgress 
                        variant="determinate" 
                        value={action.stress * 10} 
                        color="warning"
                    />
                </Box>
                
                <Typography variant="caption" color="textSecondary">
                    {new Date(action.time).toLocaleString()}
                </Typography>
            </Paper>
        );
    };

    const renderPaymentAction = (action: Action) => {
        if (!isPaymentAction(action)) return null;
        
        return (
            <Paper key={`${action.action}-${action.time}`} sx={{ p: 2, mb: 2, borderLeft: 4, borderColor: 'warning.main' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Chip label="Purchase" color="warning" size="small" sx={{ mr: 1 }} />
                    <Typography variant="h6">{action.name}</Typography>
                </Box>
                
                {action.price !== null && (
                    <Typography variant="body1" sx={{ mb: 1 }}>
                        Price: {action.price} ₾
                    </Typography>
                )}
                
                <Typography variant="caption" color="textSecondary">
                    {new Date(action.time).toLocaleString()}
                </Typography>
            </Paper>
        );
    };

    if (actions.length === 0) {
        return null;
    }

    return (
        <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Detected Actions ({actions.length})
            </Typography>
            
            {actions.map((action) => {
                if (isFoodAction(action)) return renderFoodAction(action);
                if (isMoodAction(action)) return renderMoodAction(action);
                if (isPaymentAction(action)) return renderPaymentAction(action);
                return null;
            })}
        </Box>
    );
} 