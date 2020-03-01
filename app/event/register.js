const User = require('../controllers/user')
const axios = require('axios').default
const config = require('../../resources/config')
const request = require('request')

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

        const api_url = config.api.url
        const { firstname, surname, postcode, phoneno, id } = user

        axios.post(api_url, {
            id_number: id,
            'open_account_data': 'open_account_data',
            first_name: firstname,
            last_name: surname,
            post_code: postcode,
            phone_number: phoneno,
            dob: new Date(),
        }, axiosConfig).then((res) => {
            send.message(user.id, locale('balance_res', 23))
            send.keyboard(msg.from.id, locale('queries'), action, 2)
        }).catch((err) => {
            console.error(err)
        })

        const keyboard = [locale('gohome')]
        send.keyboard(msg.from.id, locale('welcome'), keyboard)
        next && next()
    })

}
