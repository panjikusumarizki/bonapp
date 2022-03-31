const Band = require('./model')
const Player = require('../player/model')

module.exports = {
    addBand: async (req, res) => {
        try {
            const { name, max_member } = req.body

            if (!name && max_member) {
                res.status(403).json({
                    status: 'error',
                    message: 'Name and Max Member must be define'
                })
            } else {
                Band.create({ name, max_member })
                
                res.status(201).json({
                    status: 'success',
                    message: 'Berhasil menambahkan data band'
                })
            }

        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    },

    getBands: async (req, res) => {
        try {
            const bands = await Band.find()
            .select('name max_member')

            res.status(200).json({
                status: 'success',
                data: bands
            })
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    },

    getBand: async (req, res) => {
        try {
            const { id } = req.params

            const band = await Band.findOne({ _id: id })
            .select('name members')
            .populate('members', 'name position')

            res.status(200).json({
                status: 'success',
                data: band
            })
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    },

    editBand: async (req, res) => {
        try {
            const { id } = req.params
            const payload = req.body

            let band = await Band.findOne({ _id: id })

            band = await Band.findOneAndUpdate({
                _id: id
            }, { 
                ...payload 
            }, { new: true, runValidators: true })

            res.status(201).json({
                status: 'success',
                data: {
                    id: band.id,
                    name: band.name,
                    max_member: band.max_member,
                    current_member: band.current_member
                }
            })
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    },

    addPlayerToBand: async (req, res) => {
        try {
            const { player_id, band_id } = req.body

            if (!player_id && band_id) {
                res.status(403).json({
                    status: 'error',
                    message: 'Member ID and Band ID must be provide'
                })
            } else {
                let band = await Band.findOne({ _id: band_id })

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
                    }

                    res.status(201).json({
                        status: 'success',
                        message: 'Succeed add player to band'
                    })
                } else {
                    res.status(403).json({
                        status: 'error',
                        message: 'The band member is already full'
                    })
                }
            }
        } catch (error) {
            res.status(error.code).json({
                status: error.code,
                message: error.message
            })
        }
    }
}