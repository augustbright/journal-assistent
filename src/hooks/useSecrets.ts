import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { useAuth } from '../contexts/AuthContext';
import { SecretsService } from '../services/secretsService';
import { 
  secretsAtom, 
  secretsLoadingAtom, 
  secretsErrorAtom 
} from '../atoms/secrets';

export const useSecrets = () => {
  const { currentUser } = useAuth();
  const [secrets, setSecrets] = useAtom(secretsAtom);
  const [loading, setLoading] = useAtom(secretsLoadingAtom);
  const [error, setError] = useAtom(secretsErrorAtom);

  const fetchSecrets = async () => {
    if (!currentUser?.uid) return;

    try {
      setLoading(true);
      setError(null);
      
      const fetchedSecrets = await SecretsService.fetchSecrets(currentUser.uid);
      setSecrets(fetchedSecrets);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch secrets';
      setError(errorMessage);
      console.error('Error in useSecrets:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch secrets when user is authenticated
  useEffect(() => {
    if (currentUser?.uid && !secrets) {
      fetchSecrets();
    }
  }, [currentUser?.uid, secrets]);

  // Clear secrets when user logs out
  useEffect(() => {
    if (!currentUser) {
      setSecrets(null);
      setError(null);
    }
  }, [currentUser, setSecrets, setError]);

  return {
    secrets,
    loading,
    error,
    refetch: fetchSecrets,
  };
}; 