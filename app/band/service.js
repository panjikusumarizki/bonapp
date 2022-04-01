const Band = require('./model')
const Player = require('../player/model')

const addBand = async (name, max_member) => {
    try {
        const band = await Band.create({ name, max_member })
        
        return band
    } catch (error) {
        return error
    }
}

const getBands = async () => {
    try {
        const bands = await Band.find()
        .select('name max_member')

        return bands
    } catch (error) {
        return error
    }
}

const getBand = async (id) => {
    try {
        const band = await Band.findOne({ _id: id })
        .select('name members')
        .populate('members', 'name position')

        return band
    } catch (error) {
        return error
    }
}

const editBand = async (id, payload) => {
    try {
        let band = await Band.findOne({ _id: id })

        band = await Band.findOneAndUpdate({
            _id: id
        }, { 
            ...payload 
        }, { new: true, runValidators: true })

        return band
    } catch (error) {
        return error
    }
}

const addPlayerToBand = async (player_id, band_id) => {
    try {
        let band = await Band.findOne({ _id: band_id })

        const payloadBandFull = {
            code: 403,
            status: "error",
            message: "The member of the band is already full"
        }

        const payloadAlreadyHaveBand = {
            code: 403,
            status: "error",
            message: 'The player already have a band'
        }

        if (band.current_member < band.max_member) {
            const player = await Player.findOne({ _id: player_id })

            if (!player.band_id) {
                await Player.findOneAndUpdate({
                    _id: player_id
                }, {
                    band_id: band_id
                })

                band.current_member += 1
                band.members.push({ _id: player_id })
                await band.save()
            } else {
                return payloadAlreadyHaveBand
            }

            return band
        } else {
            return payloadBandFull
        }
    } catch (error) {
        return error
    }
}

module.exports = {
    addBand,
    getBands,
    getBand,
    editBand,
    addPlayerToBand
}