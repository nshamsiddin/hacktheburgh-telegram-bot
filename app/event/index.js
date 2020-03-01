const ee = require('events')
const event = new ee.EventEmitter()
const send = require('../../modules/telegam')
const map = require('../maps/map')
const register_map = require('../maps/map_register')
// Locking User Location
const state = {}



// My components
const queries = require('./queries')(event, state, map, send)
const interactive = require('./interactive')(event, state, map, send)
const register = require('./register')(event, state, register_map, send)

// Change the location of the user
event.on('location:next', (user, msg, action, value) => {
    if (action.event !== 'location:back' && !action.await) {
        state[msg.from.id].push(value)
    }
})

event.on('location:back', (user, msg) => {
    state[msg.from.id].splice(-1, 1)
    const reducer = state[msg.from.id].reduce((path, item) => {
        msg.text = item
        if (!path.children) {
            return path
        } else {
            if (path.children.hasOwnProperty(item)) {
                return path.children[item]
            } else {
                if (path.children.hasOwnProperty('*')) {
                    return path.children['*']
                } else {
                    return path
                }
            }
        }
    }, map)

    event.emit(reducer.event, user, msg, reducer)
})

event.on('location:home', (user, msg) => {

    state[msg.from.id] = []
    event.emit('location:back', user, msg)
})

event.on('home', (user, msg, action, next) => {
    send.keyboard(msg.from.id, locale('choose_action'), action, 2)
    next && next()
})

exports.event = event

exports.state = state
