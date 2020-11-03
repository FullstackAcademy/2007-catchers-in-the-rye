const router = require('express').Router();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const Stripe = require('stripe');

const stripe = new Stripe(stripeSecretKey);

router.post('/charge', async (req, res, next) => {
    try {
        const { amount } = req.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'usd',
        });
        res.send(paymentIntent.client_secret);
    }
    catch (err) {
        next(err);
    }
});

module.exports = router;
