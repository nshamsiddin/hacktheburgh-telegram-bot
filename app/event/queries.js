const User = require('../controllers/user')
const axios = require('axios').default
const config = require('../../resources/config')
module.exports = (event, state, map, send) => {

    const api_url = config.api.url

    event.on('queries', async (user, msg, action, next) => {
        send.keyboard(msg.from.id, locale('queries'), action, 2)
        next && next()
    })

    event.on('queries:balance', async (user, msg, action, next) => {
        axios.post(api_url, {
            type: 'balance',
            user_id: user.id
        }).then((res) => {
            send.message(user.id, locale('balance_res', 23))
            send.keyboard(msg.from.id, locale('queries'), action, 2)
        }).catch((err) => {
            logger.error(err)
        })
    })

}