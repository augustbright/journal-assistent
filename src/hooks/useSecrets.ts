import { useEffect } from "react";
import { useAtom } from "jotai";
import { useAuth } from "../contexts/AuthContext";
import { SecretsService } from "../services/secretsService";
import {
    secretsAtom,
    secretsLoadingAtom,
    secretsErrorAtom,
    openaiLoadingAtom,
    openaiErrorAtom,
    openaiSuccessAtom,
} from "../atoms/secrets";

export const useSecrets = () => {
    const { currentUser } = useAuth();
    const [secrets, setSecrets] = useAtom(secretsAtom);
    const [loading, setLoading] = useAtom(secretsLoadingAtom);
    const [error, setError] = useAtom(secretsErrorAtom);
    const [openaiLoading, setOpenaiLoading] = useAtom(openaiLoadingAtom);
    const [openaiError, setOpenaiError] = useAtom(openaiErrorAtom);
    const [openaiSuccess, setOpenaiSuccess] = useAtom(openaiSuccessAtom);

    const fetchSecrets = async () => {
        if (!currentUser?.uid) return;

        try {
            setLoading(true);
            setError(null);
            setOpenaiLoading(true);
            setOpenaiError(null);
            setOpenaiSuccess(false);

            const fetchedSecrets = await SecretsService.fetchSecrets(
                currentUser.uid
            );
            setSecrets(fetchedSecrets);

            // Check individual secret status
            if (fetchedSecrets?.openai) {
                setOpenaiSuccess(true);
                setOpenaiError(null);
            } else {
                setOpenaiError("OpenAI API key not found");
                setOpenaiSuccess(false);
            }
        } catch (err) {
            const errorMessage =
                err instanceof Error ? err.message : "Failed to fetch secrets";
            setError(errorMessage);
            setOpenaiError(errorMessage);
            setOpenaiSuccess(false);
            console.error("Error in useSecrets:", err);
        } finally {
            setLoading(false);
            setOpenaiLoading(false);
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
        // Individual secret states
        openaiLoading,
        openaiError,
        openaiSuccess,
    };
};
