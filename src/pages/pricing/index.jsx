// src/pages/pricing/index.jsx

import { products } from '../../lib/products'
import { Link } from 'react-router-dom'

export default function PricingOverview() {
  return (
    <div className="pricing-page">
      <h1 className="title">Choose Your Realm</h1>

      <div className="grid">
        {products.map((p) => (
          <Link key={p.slug} to={`/pricing/${p.slug}`} className="card">
            <img src={p.image} alt={p.alt} />
            <h2>{p.name}</h2>
            <p>{p.narrative.slice(0, 120)}...</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
