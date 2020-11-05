const router = require('express').Router();
const brcypt = require('bcrypt');
const hash = require('../hash');
const { User, Session, Order } = require('../db');

const A_WEEK_IN_SECONDS = 1000 * 60 * 60 * 24 * 7;

router.post('/mount', async (req, res, next) => {
  try {
    if (req.session) {
      const refreshedSession = await Session.findByPk(req.session.id);
      res.cookie('sid', refreshedSession.uuid, {
        maxAge: A_WEEK_IN_SECONDS,
        path: '/',
      }).send(refreshedSession);
    } else {
      const guestSession = await Session.create();
      res.cookie('sid', guestSession.uuid, {
        maxAge: A_WEEK_IN_SECONDS,
        path: '/',
      }).status(201).send(guestSession);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  const { username, password } = req.body;
  if (typeof username !== 'string' || typeof password !== 'string') {
    res.status(400).send({
      message: 'Username and password must both be strings.',
    });
  } else {
    try {
      const user = await User.findOne({
        where: {
          username,
        },
        include: [Session],
      });

      if (user) {
        const comparisonResult = await brcypt.compare(password, user.password);
        if (!comparisonResult) {
          throw new Error('Wrong password!');
        }
        if (user.session) {
          res.cookie('sid', user.session.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });

          const guestSession = req.session;
          const guestCart = await Order.findOne({
            where: {
              sessionId: guestSession.id,
              isPaid: false,
            },
          });
          if (guestCart) {
            const existingUserCart = await Order.findOne({
              where: {
                sessionId: user.session.id,
                isPaid: false,
              },
            });
            if (existingUserCart) {
              const guestCartCostumes = await guestCart.getCostumes();
              await existingUserCart.addCostumes(guestCartCostumes);
              await existingUserCart.calcTotal();
              await guestCart.destroy();
            } else await guestCart.setSession(user.session);
          }
          await guestSession.destroy();
          res.status(200).send(user);
        } else {
          const createdSession = await Session.create();
          await createdSession.setUser(user);
          res.cookie('sid', createdSession.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.status(201).send(user);
        }
      } else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
  }
});

router.post('/createUser', async (req, res, next) => {
  try {
    const {
      username, password, firstName, lastName, userEmail,
    } = req.body;
    const hashedPassword = await hash(password);
    const user = await User.create({
      username, password: hashedPassword, firstName, lastName, userEmail,
    });
    if (user) {
      const session = await Session.findOne({
        where: {
          uuid: req.session.uuid,
        },
      });
      await session.setUser(user);
      res.cookie('sid', session.uuid, {
        maxAge: A_WEEK_IN_SECONDS,
        path: '/',
      });
      res.send(user);
    } else res.sendStatus(500);
  } catch (err) {
    next(err);
  }
});

router.post('/logout', async (req, res, next) => {
  try {
    res.clearCookie('sid');
    const guestSession = await Session.create();
    res.cookie('sid', guestSession.uuid, {
      maxAge: A_WEEK_IN_SECONDS,
      path: '/',
    });
    res.sendStatus(200);
  } catch (err) { next(err); }
});

router.get('/thisUser', async (req, res, next) => {
  try {
    const { uuid } = req.session;
    const userSession = await Session.findOne({
      where: { uuid },
    });
    const user = await User.findByPk(userSession.userId);
    if (user) res.send(user);
    else res.sendStatus(404);
  } catch (err) {
    next(err);
  }
});

router.get('/whoami', (req, res, next) => {
  if (req.user) {
    res.send({
      username: req.user.username,
    });
  } else {
    res.sendStatus(401);
  }
});

module.exports = router;
