const { 
    addPlayer,
    getPlayers,
    getPlayer
} = require('./service')

const createPlayer = async (req, res) => {
    try {
        const { name, position } = req.body

        if (!name && position) {
            res.status(403).json({
                status: 'error',
                message: 'Name and Position must be provide'
            })
        } else {
            await addPlayer(name, position)

            res.status(201).send({
                status: 'success',
                message: 'Succeed add new player'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getListPlayers = async (req, res) => {
    try {
        const player = await getPlayers()

        res.status(200).send({
            status: 'success',
            data: player
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getThePlayer = async (req, res) => {
    try {
        const { id } = req.params

        const player = await getPlayer(id)

        res.status(200).send({
            status: 'success',
            data: player
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    createPlayer,
    getListPlayers,
    getThePlayer
}