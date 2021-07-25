import mongoose from 'mongoose'

const connection = {}

async function connectToDb() {
    if (connection.isConnected)
        return

    const db = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    console.log('Connecting to db 12345')

    connection.isConnected = db.connections[0].readyState
}

export default connectToDb
