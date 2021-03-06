const Localize = require('localize');
const config = require('../resources/config')
const shuffle = require('shuffle-array').pick
const locale = new Localize(require('../resources/locale.json'))
locale.setLocale(config.app.lang)

exports.get = (...text) => locale.translate(...text)

exports.pick = (text) => shuffle(locale.translate(text).split(';'))

exports.get_translations = (text) => locale.getTranslations()[text]