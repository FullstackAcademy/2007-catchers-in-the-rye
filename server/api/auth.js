const router = require('express').Router()
const { User, Session } = require('../db')

const A_WEEK_IN_SECONDS = 60 * 60 * 24 * 7;

router.post('/', async(req,res,next)=> {
    const { username, password } = req.body
    if (typeof username !== 'string' || typeof password !== 'string') {
        res.status(400).send({
            message: 'Username and password must both be strings.',
        });
        } else {
            try {
                const loginUser = await User.findOne({
                    where: {
                        username,
                        password
                    }, include: [Session],
                })

                if (loginUser) {
                    if(loginUser.session) {
                    // res.cookie('sid', foundUser.session.uuid, {
                    //     maxAge: A_WEEK_IN_SECONDS,
                    //     path: '/',
                    //   });
                        res.sendStatus(200)
                    } else {
                        const createdSession = await Session.create({})
                        await createdSession.setUser(loginUser)
                        // res.cookie('sid',createdSession.id, {
                        //     maxAge: A_WEEK_IN_SECONDS,
                        //     path: '/'
                        // })
                        res.sendStatus(201)
                    }
                }
            } catch(err){ 
                
                console.error(err);
      res.status(500).send({
        message: err.message,
      });
    }
            }
        })


module.exports = router
