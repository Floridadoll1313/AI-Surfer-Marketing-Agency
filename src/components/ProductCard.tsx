import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './product-card.css';

interface ProductCardProps {
  title: string;
  description: string;
  slug: string;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  slug,
  image,
}) => {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="relative group cursor-pointer"
    >
      <Link to={`/pricing/${slug}`}>
        {/* BACKGROUND GLOW */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-40 transition duration-500 blur-2xl"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,255,255,0.4), transparent 70%)',
          }}
        />

        {/* CARD */}
        <div className="relative bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-xl transition-all duration-500 group-hover:border-cyan-400/40 group-hover:shadow-[0_0_25px_rgba(0,255,255,0.4)]">
          
          {/* IMAGE */}
          <div className="h-48 w-full overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition duration-700 group-hover:scale-110"
            />
          </div>

          {/* CONTENT */}
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-2 text-white drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
              {title}
            </h2>

            <p className="text-slate-300 text-sm leading-relaxed mb-4">
              {description}
            </p>

            {/* BUTTON */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="mt-4 inline-block px-5 py-2 rounded-full text-sm font-semibold uppercase tracking-wide bg-cyan-400/20 border border-cyan-300/40 text-cyan-300 backdrop-blur-md transition-all duration-300 group-hover:bg-cyan-400/30 group-hover:border-cyan-300 group-hover:text-white"
            >
              Activate
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;