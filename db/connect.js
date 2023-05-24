const mongooes = require('mongoose')

const connectDb = async () => {
    await mongooes.connect(process.env.MONGO_URL)
        .then(() => {
            console.log('Mongo Connected Successfully')
        })
        .catch((err) => {
            console.log('error', err)
        })
}

module.exports = connectDb

