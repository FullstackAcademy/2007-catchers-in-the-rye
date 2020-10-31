const router = require('express').Router();
const { User, Session } = require('../db');

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
      const loginUser = await User.findOne({
        where: {
          username,
          password,
        },
        include: [Session],
      });
      if (loginUser) {
        if (loginUser.session) {
          res.cookie('sid', loginUser.session.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.status(200).send({
            loginUser,
            message: `Welcome back, ${username}!`,
          });
        } else {
          const createdSession = await Session.create({});
          await createdSession.setUser(loginUser);
          res.cookie('sid', createdSession.uuid, {
            maxAge: A_WEEK_IN_SECONDS,
            path: '/',
          });
          res.status(201).send({
            loginUser,
            message: `Welcome, ${username}!`,
          });
        }
      } else res.sendStatus(404);
    } catch (err) {
      next(err);
    }
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
