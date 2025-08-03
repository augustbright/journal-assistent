import { atom } from "jotai";

// Interface for secret value structure
export interface SecretValue {
    value: string;
    [key: string]: string;
}

// Interface for secrets structure
export interface Secrets {
    openai?: SecretValue;
    // Add more secret types here as needed
    // Example:
    // apiKey?: SecretValue;
    // stripe?: SecretValue;
    [key: string]: SecretValue | undefined;
}

// Main secrets atom
export const secretsAtom = atom<Secrets | null>(null);

// Individual secret atoms for easy access
export const openaiApiKeyAtom = atom(
    (get) => get(secretsAtom)?.openai?.value || null,
    (get, set, value: string) => {
        const currentSecrets = get(secretsAtom) || {};
        set(secretsAtom, {
            ...currentSecrets,
            openai: { value },
        });
    }
);

// Loading state atom
export const secretsLoadingAtom = atom<boolean>(false);

// Error state atom
export const secretsErrorAtom = atom<string | null>(null);

// Helper function to create new secret atoms
export const createSecretAtom = (key: string, subKey: string = "value") => {
    return atom(
        (get) => {
            const secrets = get(secretsAtom);
            const secret = secrets?.[key];
            return secret?.[subKey] || null;
        },
        (get, set, value: string) => {
            const currentSecrets = get(secretsAtom) || {};
            set(secretsAtom, {
                ...currentSecrets,
                [key]: {
                    ...currentSecrets[key],
                    [subKey]: value,
                } as { value: string },
            });
        }
    );
};
