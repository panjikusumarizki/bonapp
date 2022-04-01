const {
    addBand,
    getBand,
    getBands,
    editBand,
    addPlayerToBand
} = require('./service')

const createBand = async (req, res) => {
    try {
        const { name, max_member } = req.body

        if (!name && max_member) {
            return res.status(403).json({
                status: 'error',
                message: 'Name and Max Member must be define'
            })
        } else {
            await addBand(name, max_member)
    
            res.status(201).json({
                status: 'success',
                message: 'Succeed add new band'
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getListBands = async (req, res) => {
    try {
        const bands = await getBands()

        let payload = []
        
        for (let i = 0; i < bands.length; i++) {
            payload.push({
                name: bands[i].name,
                max_member: bands[i].max_member
            })

        }

        res.status(200).json({
            status: 'success',
            data: payload
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const getDetailBand = async (req, res) => {
    try {
        const { id } = req.params

        const band = await getBand(id)

        let payloadMembers = []

        for (let i = 0; i < band.members.length; i++) {
            payloadMembers.push({
                name: band.members[i].name,
                position: band.members[i].position
            })
        }

        const payload = {
            name: band.name,
            members: payloadMembers
        }

        if (band.name === 'CastError') {
            res.status(404).json({
                status: 'error',
                message: band.message
            })
        } else {
            res.status(200).json({
                status: 'success',
                data: payload
            })
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const editTheBand = async (req, res) => {
    try {
        const { id } = req.params
        const payload = req.body

        let band = await editBand(id, payload)

        res.status(201).json({
            status: 'success',
            message: 'Succeed edit the band',
            data: {
                id: band.id,
                name: band.name,
                max_member: band.max_member,
                current_member: band.current_member
            }
        })
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

const addPlayerToTheBand = async (req, res) => {
    try {
        const { player_id, band_id } = req.body

        if (!player_id && band_id) {
            res.status(403).json({
                status: 'error',
                message: 'Member ID and Band ID must be provide'
            })
        } else {
            const band = await addPlayerToBand(player_id, band_id)

            if (band.code !== 403) {
                res.status(201).json({
                    status: 'success',
                    message: 'Succeed add player to band'
                })
            } else {
                res.status(band.code).json({
                    status: band.status,
                    message: band.message
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

module.exports = {
    createBand,
    getListBands,
    getDetailBand,
    editTheBand,
    addPlayerToTheBand
}