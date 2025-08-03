import axios from "axios";

export interface OpenAIResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
        index: number;
        message: {
            role: string;
            content: string;
        };
        finish_reason: string;
    }>;
    usage: {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    };
}

export class OpenAIService {
    private static readonly BASE_URL = "https://api.openai.com/v1";

    /**
     * Make a call to OpenAI API with a prompt
     * @param apiKey - OpenAI API key
     * @param prompt - The prompt to send
     * @returns Promise<OpenAIResponse>
     */
    static async generateResponse(
        apiKey: string,
        prompt: string
    ): Promise<OpenAIResponse> {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/chat/completions`,
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "user",
                            content: prompt,
                        },
                    ],
                    max_tokens: 1000,
                    temperature: 0.7,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error calling OpenAI API:", error);
            throw error;
        }
    }

    /**
     * Make a call to OpenAI API with a specific prompt ID and input text
     * @param apiKey - OpenAI API key
     * @param promptId - The prompt ID
     * @param inputText - The text from the input field
     * @param version - The prompt version
     * @returns Promise<any>
     */
    static async generateResponseWithPromptId(
        apiKey: string,
        promptId: string,
        inputText: string,
        version: string = "1"
    ): Promise<any> {
        try {
            const response = await axios.post(
                `${this.BASE_URL}/responses`,
                {
                    prompt: {
                        id: promptId,
                        version: version,
                    },
                    input: [
                        {
                            role: "user",
                            content: [
                                {
                                    type: "input_text",
                                    text: inputText,
                                },
                            ],
                        },
                    ],
                    text: {
                        format: {
                            type: "text",
                        },
                    },
                    reasoning: {},
                    max_output_tokens: 2048,
                    store: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                    },
                }
            );

            return response.data;
        } catch (error) {
            console.error("Error calling OpenAI API with prompt ID:", error);
            throw error;
        }
    }
}
