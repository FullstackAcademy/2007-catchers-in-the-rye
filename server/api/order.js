const nodemailer = require('nodemailer');

const router = require('express').Router();
const {
  Order, Costume, Lineitem, Session,
} = require('../db');
const User = require('../db/models/User');

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.findAll();
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.get('/userCart', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const cart = await Order.findOne({
      where: {
        sessionId,
        isPaid: false,
      },
      include: [Costume],
    });
    res.send(cart);
  } catch (err) {
    next(err);
  }
});

router.get('/orderHistory', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const orders = await Order.findAll({
      where: {
        sessionId,
        isPaid: true,
      },
      include: [Costume],
    });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

router.put('/userCart/:costumeId', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const { costumeId } = req.params;
    const { sign } = req.body;
    const cart = await Order.findOne({
      where: {
        sessionId,
        isPaid: false,
      },
      include: [Costume],
    });
    const orderId = cart.id;
    const lineitem = await Lineitem.findOne({
      where: { costumeId, orderId },
    });
    if (sign === '+') {
      await lineitem.increment('quantity');
    }
    if (sign === '-') {
      await lineitem.decrement('quantity');
      // if quantity goes down to 0 as result of decrement, destroy so costume is removed from cart
      if (!lineitem.quantity) lineitem.destroy();
    }
    await cart.calcTotal();
    if (lineitem) res.send(lineitem);
  } catch (err) {
    next(err);
  }
});

router.post('/userCart/:costumeId', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const { costumeId } = req.params;
    const { quantity } = req.body;
    let cart = await Order.findOne({
      where: {
        sessionId,
        isPaid: false,
      },
      include: [Costume],
    });
    if (!cart) cart = await Order.create({ sessionId });
    let lineitem = await Lineitem.findOne({
      where: {
        orderId: cart.id,
        costumeId,
      },
    });
    if (!lineitem) lineitem = await Lineitem.create({ orderId: cart.id, costumeId, quantity });
    else await lineitem.increment({ quantity });
    await cart.calcTotal();
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.delete('/userCart/:costumeId', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const { costumeId } = req.params;
    const cart = await Order.findOne({
      where: {
        sessionId,
        isPaid: false,
      },
      include: [Costume],
    });
    const orderId = cart.id;
    const lineitem = await Lineitem.findOne({
      where: { costumeId, orderId },
    });
    await lineitem.destroy();
    await cart.calcTotal();
    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.put('/isPaid/:id', async (req, res, next) => {
  try {
    const { name, email } = req.body.billingDetails;
    const {
      line1, city, state, postal_code,
    } = req.body.billingDetails.address;
    const shippingAddress = `${line1}, ${city}, ${state}, ${postal_code}`;
    const order = await Order.findByPk(req.params.id);
    await order.update({
      isPaid: true,
      shippingAddress,
      name,
      email,
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.get('/admin/pending', async (req, res, next) => {
  try {
    const sessionId = req.session.id;
    const session = await Session.findOne({
      where: sessionId,
    });
    const user = await User.findOne({
      where: {
        id: session.userId,
      },
    });
    if (!user || user.userType !== 'admin') res.sendStatus(403);
    else {
      const orders = await Order.findAll({
        where: {
          isShipped: false,
          isPaid: true,
        },
        order: [
          ['updatedAt', 'ASC'],
        ],
        include: [
          { model: Session, include: [User] }, Costume],
      });
      res.send(orders);
    }
  } catch (err) { next(err); }
});

router.put('/admin/pending/:id', async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const shippedOrder = await Order.findByPk(orderId, { include: [Costume] });
    await shippedOrder.update({
      isShipped: true,
    });
    res.send(shippedOrder);
  } catch (err) { next(err); }
});

module.exports = router;
