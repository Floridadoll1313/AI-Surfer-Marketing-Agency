import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface ProductCardProps {
  title: string;
  description: string;
  slug: string;
  image: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  slug,
  image,
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="product-card group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md shadow-lg hover:shadow-neon-cyan/40 transition-all duration-300"
    >
      {/* IMAGE */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
        />

        {/* GLOW OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 pointer-events-none" />
      </div>

      {/* CONTENT */}
      <div className="p-6">
        <h3 className="text-2xl font-black italic text-neon-cyan drop-shadow-[0_0_12px_rgba(0,255,255,0.4)] mb-2">
          {title}
        </h3>

        <p className="text-slate-400 text-sm mb-6 leading-relaxed">
          {description}
        </p>

        {/* BUTTON */}
        <Link
          to={`/pricing/${slug}`}
          className="block w-full text-center py-3 rounded-xl bg-neon-cyan text-black font-semibold hover:bg-neon-pink transition-all duration-300"
        >
          Explore Tier
        </Link>
      </div>
    </motion.div>
  );
};