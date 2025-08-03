// Base interface for all actions
export interface BaseAction {
    action: string;
    time: string;
}

// Food action interface
export interface FoodAction extends BaseAction {
    action: "food";
    name: string;
    calories: number;
    carbs: number;
    sugar: number;
    fats: number;
    protein: number;
    fiber: number;
}

// Mood action interface
export interface MoodAction extends BaseAction {
    action: "mood";
    quote: string;
    happiness: number;
    sadness: number;
    anger: number;
    stress: number;
}

// Payment/Buy action interface
export interface PaymentAction extends BaseAction {
    action: "buy";
    name: string;
    price: number | null;
}

// Union type for all possible actions
export type Action = FoodAction | MoodAction | PaymentAction;

// Type guard functions to check action types
export const isFoodAction = (action: Action): action is FoodAction => {
    return action.action === "food";
};

export const isMoodAction = (action: Action): action is MoodAction => {
    return action.action === "mood";
};

export const isPaymentAction = (action: Action): action is PaymentAction => {
    return action.action === "buy";
}; 