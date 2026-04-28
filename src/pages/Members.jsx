import React from "react";

export const Members = () => {
  return (
    <div className="min-h-screen bg-black text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-black italic tracking-tighter mb-12 text-center">
          Join the Collective
        </h1>

        <div
          dangerouslySetInnerHTML={{
            __html: `
              <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
              <stripe-pricing-table
                pricing-table-id="prctbl_1TQw5yRwAZCPDqtylQB0Si0N"
                publishable-key="pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi">
              </stripe-pricing-table>
            `,
          }}
        />
      </div>
    </div>
  );
};
