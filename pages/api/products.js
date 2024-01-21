const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    //Get all the products from Stripe
    let products = [];
    let hasMore = true;
    let startingAfter;
    while (hasMore) {
        const stripeProducts = await stripe.products.list({
            active: true,
            limit: 100,
            starting_after: startingAfter,
        });
        products = [...products, ...stripeProducts.data];
        hasMore = stripeProducts.has_more;
        if (hasMore) {
            startingAfter = stripeProducts.data[stripeProducts.data.length - 1].id;
        }
    }
    res.status(200).json(products);
}