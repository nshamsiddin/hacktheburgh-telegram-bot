process.env.NTBA_FIX_319 = 1;
const emoji = require('./decoder')
const User = require('../app/controllers/user')
const TelegramBot = require('node-telegram-bot-api')
const config = require('../resources/config')

let bot = null

bot = new TelegramBot(config.bot.token, { polling: true })

exports.bot = bot

// Send message
exports.message = (chat_id, message, options = { parse_mode: 'markdown' }) =>
    bot.sendMessage(chat_id, message, options)

// Send photo
exports.photo = (chat_id, file_id, caption) =>
    bot.sendPhoto(chat_id, file_id, {
        caption: caption,
        parse_mode: 'Markdown'
    })

exports.error = async (id, err) =>
    bot.sendMessage(id, err, { parse_mode: 'markdown' })

exports.setAction = (id, action) => bot.sendChatAction(id, action)

// Send question
exports.question = (chat_id, options, file_id) => {
    let opt = []
    options.map(p => opt.push([{ text: emoji.encode(p.text) }]))
    bot.sendPhoto(chat_id, file_id, {
        reply_markup: { keyboard: opt, resize_keyboard: true, one_time_keyboard: true },
    })
}

exports.requestPhoneNumber = (chat_id, message) => {
    bot.sendMessage(chat_id, message, {
        reply_markup: {
            keyboard: [[{ text: 'Share my contact 📞', request_contact: true }]],
            resize_keyboard: true,
            one_time_keyboard: true
        }
    })

}


// Sending Messages with the keyboard
exports.keyboard = (user, message, data, inline = 2, options = {}) => {
    let opt = [], arr = [], i = 0

    // If the map object entered, we take the data from the current branch
    if (!Array.isArray(data)) {
        for (let item in data.children) {
            arr.push(item)
        }
    } else {
        // Received a proper array
        arr = data
    }

    for (let key of arr) {
        if (key === '*') continue
        // If the inline is greater than 1, then insert the inline elements in one line
        if (i < inline && opt[opt.length - 1] !== undefined) {
            opt[opt.length - 1].push({
                text: emoji.encode(key)
            })
        } else {
            if (i === inline) i = 0
            opt.push([{ text: emoji.encode(key) }])
        }
        i++
    }

    bot.sendMessage(user, message, {
        reply_markup: {
            keyboard: opt,
            resize_keyboard: true
            // one_time_keyboard: true
        },
        ...options
    })
}

// Send a message with the keyboard hiding
exports.messageHiddenKeyboard = (user, message) => {
    bot.sendMessage(user, message, {
        reply_markup: {
            remove_keyboard: true,
        },
        parse_mode: 'Markdown',
    })
}

// exports.getFile = async (msg) => {
//     const file = await bot.getFile(msg.photo[msg.photo.length - 1].file_id)
//     const url = `${config.bot.file_api}${config.bot.token}/${file.file_path}`
//     return {
//         url: url,
//         size: file.size,
//         file_id: file.file_id,
//         path: file.file_path
//     }
// }
// exports.getFileById = async (file_id) => {
//     const file = await bot.getFile(file_id)
//     const url = `${config.bot.file_api}${config.bot.token}/${file.file_path}`
//     return {
//         url: url,
//         size: file.size,
//         file_id: file.file_id,
//         path: file.file_path
//     }
// }