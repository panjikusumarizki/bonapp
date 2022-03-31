const mongoose = require('mongoose')

const bandSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Nama kategori harus diisi']
    },
    current_member: {
        type: Number,
        default: 0
    },
    max_member: {
        type: Number,
        require: [true, 'Jumlah maksimum member harus diisi']
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
    }]
}, { timestamps: true })

module.exports = mongoose.model('Band', bandSchema)