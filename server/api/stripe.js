const router = require('express').Router();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

const stripe = require('stripe')(stripeSecretKey);

// console.log(stripeSecretKey);
// console.log(stripePublicKey);

let connectionToken = stripe.terminal.connectionTokens.create();

router.post('/', async (req, res, next) => {
    try {
        const { token } = req.body;
        console.log(token);
        const customer = await stripe.customers.create({
            amount: token.totalPrice * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: 'Completed purchase',
            shipping: {
                name: token.card.name,
                address: {
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    city: token.card.address_city,
                    country: token.card.address_country,
                    postal_code: token.card.address_zip,
                }
            }
        })
        res.send('payment successful')
    } catch(err) {
        console.log('payment failed');
        next(err);
    }
});

// router.get('/connection_token', async (req, res, next) => {
//     try {
//         if (req.method === "post"){}
//     } catch(err) {
//         next(err)
//     }
// });
