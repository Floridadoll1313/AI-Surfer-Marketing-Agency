import React from "react";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#02111f] to-black flex items-center justify-center text-white px-6">
      <div className="max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4">Payment Successful</h1>
        <p className="text-lg opacity-80 mb-6">
          Your subscription is active. Welcome to the Ocean Tide Drop inner circle.
        </p>

        <Link
          to="/members"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold transition"
        >
          Go to Members Area
        </Link>
      </div>
    </div>
  );
};

export default Success;
        </h1>

        <p className="text-cyan-200/80 mb-10 font-medium leading-relaxed">
          Your data packet has been authenticated.  
          The Collective recognizes your arrival.
        </p>

        <Link
          to="/members/dashboard"
          className="flex items-center justify-center gap-2 w-full py-4 bg-cyan-300 text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,255,0.4)]"
        >
          Enter Dashboard <ArrowRight size={16} />
        </Link>
      </motion.div>
    </div>
  );
};

export default Success;
