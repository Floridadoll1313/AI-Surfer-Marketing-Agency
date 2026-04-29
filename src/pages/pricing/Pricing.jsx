    <!-- Stripe Pricing Table Script (Required for the tables to load) -->
    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            padding: 40px;
            background-color: #f6f9fc;
            text-align: center;
        }
        .container {
            max-width: 1000px;
            margin: 0 auto;
        }
        h1 { color: #32325d; margin-bottom: 40px; }
        .pricing-section { margin-bottom: 60px; }
    </style>
</head>
<body>

    <div class="container">
        <h1>Choose Your Plan</h1>

        <!-- Pricing Table Option 1 -->
        <div class="pricing-section">
            <stripe-pricing-table 
                pricing-table-id="prctbl_1TQw5yRwAZCPDqtylQB0Si0N" 
                publishable-key="pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi">
            </stripe-pricing-table>
        </div>

        <!-- Pricing Table Option 2 -->
        <div class="pricing-section">
            <stripe-pricing-table 
                pricing-table-id="prctbl_1TQvzmRwAZCPDqtyFmCeKNi1" 
                publishable-key="pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi">
            </stripe-pricing-table>
        </div>

        <!-- Pricing Table Option 3 -->
        <div class="pricing-section">
            <stripe-pricing-table 
                pricing-table-id="prctbl_1TQw2URwAZCPDqtyKTZZUQMo" 
                publishable-key="pk_live_51Q2XUORwAZCPDqtydW4uiu9lb4c3lQmiD3stgOYTwouLpIZgGshtd83dt82kZl8olvhEIvJAVBTZJnCuUnCK757o00guoyHSoi">
            </stripe-pricing-table>
        </div>
    </div>

</body>
</html>