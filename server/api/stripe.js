const router = require('express').Router();
// const uuid = require('uuid')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripePublicKey = process.env.STRIPE_PUBLIC_KEY;

// const stripe = require('stripe')(stripeSecretKey);
const Stripe = require('stripe');

const stripe = new Stripe(stripeSecretKey);

// router.get('/', (req, res) => {
//     res.render('index.pug', { stripePublicKey });
// });

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
// console.log(stripeSecretKey);
// console.log(stripePublicKey);

// router.post('/', async (req, res, next) => {
//     try {
//         const { token } = req.body;
//         console.log(token);
//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });

//         //const idemptencyKey = uuid.v4();
//         await stripe.charges.create({
//             amount: token.totalPrice * 100,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: 'Completed purchase',
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     line1: token.card.address_line1,
//                     line2: token.card.address_line2,
//                     city: token.card.address_city,
//                     country: token.card.address_country,
//                     postal_code: token.card.address_zip,
//                 }
//             }
//         },
//             // {
//             //     idemptencyKey
//             // }
//         )
//         //ToDo: change isPaid to true on order
//         res.send('payment successful');
//     } catch(err) {
//         console.log('payment failed');
//         next(err);
//     }
// });

//let connectionToken = stripe.terminal.connectionTokens.create();

// router.get('/connection_token', async (req, res, next) => {
//     try {
//         if (req.method === "post"){}
//     } catch(err) {
//         next(err)
//     }
// });

module.exports = router;
