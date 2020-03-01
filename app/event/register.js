const User = require('../controllers/user')

module.exports = async (event, state, map, send) => {

    event.on('register:init', async (user, msg, action, next) => {
        user = { id: msg.from.id }
        await User.create(user, action, next)
        send.messageHiddenKeyboard(user.id, locale('set_firstname'))
        next && next()
    })

    event.on('register:firstname', async (user, msg, action, next) => {
        user.firstname = msg.text
        await User.save(user)
        send.message(user.id, locale('set_surname'))
        next && next()
    })

    event.on('register:surname', async (user, msg, action, next) => {
        user.surname = msg.text
        await User.save(user)
        send.requestPhoneNumber(user.id, locale('set_phone'))
        next && next()
    })

    event.on('register:phone', async (user, msg, action, next) => {
        if (msg.contact && msg.contact.phone_number) {
            user.phoneno = msg.contact.phone_number
            await User.save(user)
            send.message(user.id, locale('set_postcode'))
            next && next()
        }
        else {
            event.emit('register:phone', user, msg, action, next)
        }
    })

    event.on('register:postcode', async (user, msg, action, next) => {
        user.postcode = msg.text
        user.active = true
        await User.save(user)
        const keyboard = [[{text : locale('gohome')}]]
        send.keyboard(msg.from.id, locale('welcome'), action, 2)
        next && next()
    })

}
