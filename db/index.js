const mongoose = require('mongoose')
const { urlDB } = require('../config')

const connect = () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(urlDB, {
            useUnifiedTopology: true,
            useNewUrlParser: true 
        })
        .then((err, res) => {
            if (err) return reject(err)
            resolve()
        })
    })
}

const close = () => {
    return mongoose.disconnect()
}

module.exports = { connect, close }