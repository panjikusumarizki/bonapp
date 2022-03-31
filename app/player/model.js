const mongoose = require('mongoose')

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama player harus diisi']
    },
    band_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Band'
    },
    position: {
        type: String,
        require: [true, 'Posisi player harus diisi']
    }
}, { timestamps: true })

module.exports = mongoose.model('Player', playerSchema)