import React from 'react'
import { products } from "../../lib/products"

import ProductCard from '../../components/ProductCard'
import './pricing.css'

export default function PricingPage() {
  return (
    <div className="pricing-page">
      <div className="pricing-hero">
        <h1 className="pricing-hero-title">Choose Your System</h1>
        <p className="pricing-hero-subtitle">
          Every offering is a lighthouse — a cinematic system built to elevate your world.
        </p>
      </div>

      <div className="pricing-grid">
        {products.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  )
}
