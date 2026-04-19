// src/lib/checkout.js

import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export async function redirectToCheckout(priceId) {
  const stripe = await stripePromise

  await stripe.redirectToCheckout({
    lineItems: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    successUrl: `${window.location.origin}/thank-you`,
    cancelUrl: `${window.location.origin}/pricing`
  })
}
