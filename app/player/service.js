const Player = require('./model')

const addPlayer = async (name, position) => {
    try {
        const player = await Player.create({ name, position })

        return player
    } catch (error) {
        return error
    }
}

const getPlayers = async () => {
    try {
        const player = await Player.find()

        return player
    } catch (error) {
        return error
    }
}

const getPlayer = async (id) => {
    try {
        const player = await Player.findOne({ _id: id })

        return player
    } catch (error) {
        return error
    }
}

module.exports = {
    addPlayer,
    getPlayers,
    getPlayer
}