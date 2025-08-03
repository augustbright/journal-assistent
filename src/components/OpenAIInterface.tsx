import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { useAtomValue } from 'jotai';
import { openaiApiKeyAtom } from '../atoms/secrets';
import { OpenAIService, OpenAIResponse } from '../services/openaiService';

export default function OpenAIInterface() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const openaiApiKey = useAtomValue(openaiApiKeyAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    if (!openaiApiKey) {
      setError('OpenAI API key not found. Please check your secrets configuration.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResponse('');

      const result: OpenAIResponse = await OpenAIService.generateResponse(openaiApiKey, prompt);
      
      if (result.choices && result.choices.length > 0) {
        setResponse(result.choices[0].message.content);
      } else {
        setError('No response received from OpenAI');
      }
    } catch (err: any) {
      console.error('OpenAI API error:', err);
      setError(err.response?.data?.error?.message || err.message || 'Failed to call OpenAI API');
    } finally {
      setLoading(false);
    }
  };

  const handlePromptIdCall = async () => {
    if (!openaiApiKey) {
      setError('OpenAI API key not found. Please check your secrets configuration.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setResponse('');

      // Using the prompt ID from your curl example
      const result = await OpenAIService.generateResponseWithPromptId(
        openaiApiKey,
        'pmpt_688f8ad66f148190be5af55d2d5f3bec08612d69fdddd2b3',
        '1'
      );
      
      setResponse(JSON.stringify(result, null, 2));
    } catch (err: any) {
      console.error('OpenAI API error:', err);
      setError(err.response?.data?.error?.message || err.message || 'Failed to call OpenAI API');
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
          OpenAI API key not available. Please check your Firestore secrets configuration.
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          label="Enter your prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          disabled={loading || !openaiApiKey}
          sx={{ mb: 2 }}
        />
        
        <Button
          type="submit"
          variant="contained"
          disabled={loading || !openaiApiKey || !prompt.trim()}
          sx={{ mr: 2 }}
        >
          {loading ? <CircularProgress size={20} /> : 'Send to OpenAI'}
        </Button>
      </Box>

      <Divider sx={{ my: 2 }} />
      
      <Typography variant="subtitle2" gutterBottom>
        Or test with specific prompt ID:
      </Typography>
      
      <Button
        variant="outlined"
        onClick={handlePromptIdCall}
        disabled={loading || !openaiApiKey}
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={20} /> : 'Call with Prompt ID'}
      </Button>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {response && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Response:
          </Typography>
          <Paper 
            variant="outlined" 
            sx={{ 
              p: 2, 
              backgroundColor: '#f5f5f5',
              maxHeight: '300px',
              overflow: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.875rem'
            }}
          >
            {response}
          </Paper>
        </Box>
      )}
    </Paper>
  );
} 