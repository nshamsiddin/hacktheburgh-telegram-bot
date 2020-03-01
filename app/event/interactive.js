const User = require('../controllers/user')
const axios = require('axios').default
const config = require('../../resources/config')
module.exports = (event, state, map, send) => {

    const api_url = config.api.url

    event.on('interactive', (user, msg, action, next) => {
        send.messageHiddenKeyboard(user.id, locale('send_questions'))
        next && next()
    })

    event.on('interactive:mode', (user, msg, action, next) => {

        const { id } = user
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
            }
        }

        axios.post(api_url, {
            user_id: id,
            query: msg.text
        }, axiosConfig)
            .then((res) => {
                send.messageHiddenKeyboard(id, res.body.reponse)
                // if (!res.next)
                    // event.emit('location:back', user, msg)

            }).catch((err) => {
                console.error(err)
                // event.emit('location:back', user, msg)
            })

    })

}