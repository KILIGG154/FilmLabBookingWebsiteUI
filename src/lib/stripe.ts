import { loadStripe } from "@stripe/stripe-js";

// Set VITE_STRIPE_PUBLISHABLE_KEY in your env to enable live card tokenization.
// Without it the checkout still validates card input client-side and runs in demo mode.
const key = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string | undefined;

export const stripePromise = key ? loadStripe(key) : null;
export const hasStripeKey = Boolean(key);
