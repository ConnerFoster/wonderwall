const mongoose = require('mongoose')

const connectToDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI)

    console.log(
      `Connection to MongoDB Successful: ${connect.connection.host}`.cyan
    )
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectToDatabase
