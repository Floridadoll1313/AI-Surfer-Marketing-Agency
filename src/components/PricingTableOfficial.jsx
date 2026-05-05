import React from "react";

export default function PricingTableOfficial() {
  return (
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
  )
}
