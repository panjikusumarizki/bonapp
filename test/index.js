const chai = require('chai')
const expect = chai.expect
const chaiHttp = require('chai-http')

chai.use(chaiHttp)

const app = require('../app')

describe('Band Unit Test', function () {
    it('should get all the bands', (done) => {
        chai.request(app).get('/api/v1/band').end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.have.an('array')
            done()
        })
    })

    it('should get detail of the band', (done) => {
        chai.request(app).get('/api/v1/band/624528a589408a6b7b832b6f').end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(200)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('members')
            expect(res.body.data.members).to.have.an('array')
            done()
        })
    })

    it('should success add new band', (done) => {
        const sample = {
            name: "Nive",
            max_member: 5
        }

        chai.request(app).post('/api/v1/band/create')
        .set('Content-Type', 'application/json')
        .field('name', sample.name)
        .field('max_member', sample.max_member)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Succeed add new band')
            done()
        })
    })

    it('should success edit the band', (done) => {
        const sample = {
            name: "Nive"
        }

        chai.request(app).put('/api/v1/band/edit/6246c1022c6954e2f00a4101')
        .set('Content-Type', 'application/json')
        .field('name', sample.name)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('status')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Succeed edit the band')
            expect(res.body).to.have.property('data')
            expect(res.body.data).to.be.an('object')
            expect(res.body.data).to.have.property('id')
            expect(res.body.data).to.have.property('name')
            expect(res.body.data).to.have.property('max_member')
            expect(res.body.data).to.have.property('current_member')
            done()
        })
    })

    it('should success add player to a band', (done) => {
        const sample = {
            player_id: "6245bf5eee6aa85723d5b350",
            band_id: "624528a589408a6b7b832b6f"
        }

        chai.request(app).post('/api/v1/band/personnel')
        .set('Content-Type', 'application/json')
        .field('player_id', sample.player_id)
        .field('band_id', sample.band_id)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('status')
            expect(res.body.status).to.equal('success')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Succeed add player to band')
            done()
        })
    })
})

describe('Player Unit Test', function () {
    it('should success create player', (done) => {
        const sample = {
            name: "Harry",
            position: 'Drum'
        }

        chai.request(app).post('/api/v1/player/create')
        .set('Content-Type', 'application/json')
        .field('name', sample.name)
        .field('position', sample.position)
        .end((err, res) => {
            expect(err).to.be.null
            expect(res).to.have.status(201)
            expect(res.body).to.be.an('object')
            expect(res.body).to.have.property('status')
            expect(res.body.status).to.equal('success')
            expect(res.body).to.have.property('message')
            expect(res.body.message).to.equal('Succeed add new player')
            done()
        })
    })
})