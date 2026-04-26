import { loadStripe } from '@stripe/stripe-js';

// Make sure your Environment Variable is set in your hosting provider (Vercel/Netlify)
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export const redirectToCheckout = async (priceId: string) => {
  try {
    const stripe = await stripePromise;
    if (!stripe) throw new Error('Stripe failed to initialize.');

    const { error } = await stripe.redirectToCheckout({
      lineItems: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/pricing`,
    });

    if (error) {
      console.error('Stripe Checkout Error:', error);
    }
  } catch (err) {
    console.error('Neural Link to Stripe failed:', err);
  }
};
