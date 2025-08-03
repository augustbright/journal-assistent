import { atom } from "jotai";

// Interface for secrets structure
export interface Secrets {
    openai?: string;
    // Add more secret types here as needed
    // Example:
    // apiKey?: string;
    // stripe?: string;
    [key: string]: string | undefined;
}

// Main secrets atom
export const secretsAtom = atom<Secrets | null>(null);

// Individual secret atoms for easy access
export const openaiApiKeyAtom = atom(
    (get) => get(secretsAtom)?.openai || null,
    (get, set, value: string) => {
        const currentSecrets = get(secretsAtom) || {};
        set(secretsAtom, {
            ...currentSecrets,
            openai: value,
        });
    }
);

// Individual secret loading states
export const openaiLoadingAtom = atom<boolean>(false);
export const openaiErrorAtom = atom<string | null>(null);
export const openaiSuccessAtom = atom<boolean>(false);

// General secrets loading state (for overall status)
export const secretsLoadingAtom = atom<boolean>(false);

// General secrets error state
export const secretsErrorAtom = atom<string | null>(null);

// Helper function to create new secret atoms
export const createSecretAtom = (key: string) => {
    return atom(
        (get) => {
            const secrets = get(secretsAtom);
            return secrets?.[key] || null;
        },
        (get, set, value: string) => {
            const currentSecrets = get(secretsAtom) || {};
            set(secretsAtom, {
                ...currentSecrets,
                [key]: value,
            });
        }
    );
};
