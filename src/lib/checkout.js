import { loadStripe } from "@stripe/stripe-js"

// Load Stripe once (Vite + Cloudflare safe)
let stripePromise

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
    }
    return stripePromise
}

export async function redirectToCheckout(priceId) {
    const stripe = await getStripe()

    if (!stripe) {
        console.error("Stripe failed to initialize")
        return
    }

    const { error } = await stripe.redirectToCheckout({
        lineItems: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        mode: "subscription",
        successUrl: `${window.location.origin}/thank-you`,
        cancelUrl: `${window.location.origin}/pricing`,
    })

    if (error) {
        console.error("Stripe Checkout error:", error)
    }
}
