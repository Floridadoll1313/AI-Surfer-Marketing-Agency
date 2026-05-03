import React from 'react';
import { Link } from 'react-router-dom';
import './product-card.css';

interface ProductCardProps {
  title: string;
  description: string;
  image?: string;
  slug: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  image,
  slug,
}) => {
  return (
    <div className="product-card">
      {image && (
        <div className="product-card-image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="product-card-title">{title}</div>

      <div className="product-card-desc">{description}</div>

      <Link to={`/product/${slug}`}>
        <button className="product-card-button">
          Activate
        </button>
      </Link>
    </div>
  );
};
