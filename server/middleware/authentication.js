const chalk = require('chalk')
const { Session, User } = require('../db')

const authMiddleware = async(req, res, next) => {
    const { sid } = req.cookies

    if(!sid) {
        console.log('No session associated with this user.')
        req.session = null
    } 
    else {
        const session = await Session.findOne({
            where: {
                uuid: sid
            }, 
            include: [User]
        })
        if(!session) {
            console.log(chalk.red('Invalid session ID - not located in database. Removing cookie.'));
            res.clearCookie('sid')
            req.session = null
        }
        else {
            if (session) {
                console.log(chalk.magenta(`Session User Identified: ${session.user.username}`));
            } else {
                console.log(chalk.magenta(`Session User Identified: Guest`))
            }
            req.session = session;
        }
    }
    next()
}

module.exports = authMiddleware