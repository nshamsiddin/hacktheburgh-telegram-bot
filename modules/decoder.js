const emoji = {
}

exports.encode = text => {
    return emoji.hasOwnProperty(text) ? emoji[text] + ' ' + text : text
}

exports.decode = text => {
    let val = text.split(' ')

    if (val.length < 2) return text

    val.splice(0, 1)
    val = val.join(' ')

    for (let key in emoji) {
        if (key === val) return key
    }

    return text
}

const numbers = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣']
exports.emojify = number => {
    if (number && !isNaN(number))
        return number.toString().split('').map(p => numbers[p]).join('')
    else
        return '0️⃣'
}
exports.demojify = emoji => {
    if (numbers.indexOf(emoji) !== -1)
        return numbers.indexOf(emoji)
    else
        return null
}