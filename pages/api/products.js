const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    //active products only
    const products = await stripe.products.list({ active: true });
    res.status(200).json(products);
}