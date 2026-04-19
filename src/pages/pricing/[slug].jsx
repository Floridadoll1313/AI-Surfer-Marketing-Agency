// src/pages/pricing/[slug].jsx

import { useParams } from 'react-router-dom'
import { products } from '../../lib/products'
import { redirectToCheckout } from '../../lib/checkout'

export default function ProductPage() {
  const { slug } = useParams()
  const product = products.find((p) => p.slug === slug)

  if (!product) return <div>Product not found.</div>

  return (
    <div className="product-page">
      <img src={product.image} alt={product.alt} className="hero-image" />

      <h1>{product.name}</h1>

      <section className="narrative">
        <p>{product.narrative}</p>
      </section>

      <section className="features">
        <h2>What’s Inside</h2>
        <ul>
          {product.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      </section>

      <button
        className="checkout-button"
        onClick={() => redirectToCheckout(product.stripePriceId)}
      >
        Begin Your Journey
      </button>
    </div>
  )
}
