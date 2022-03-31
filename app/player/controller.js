const Player = require('./model')

module.exports = {
    addPlayer: async (req, res) => {
        try {
            const { name, position } = req.body

            if (!name && position) {
                res.status(403).json({
                    status: 'error',
                    message: 'Name and Position must be provide'
                })
            } else {
                await Player.create({ name, position })
    
                res.status(201).send({
                    status: 'success',
                    message: 'Berhasil menambahkan player'
                })
            }
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    },

    getPlayers: async (req, res) => {
        try {
            const player = await Player.find()

            res.status(200).send({
                status: 'success',
                data: player
            })
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    },

    getPlayer: async (req, res) => {
        try {
            const { id } = req.params

            const player = await Player.findOne({ _id: id })

            res.status(200).send({
                status: 'success',
                data: player
            })
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    }
}