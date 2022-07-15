const mongoose = require('mongoose')

const connectDB = async() => {
    try{
        const conn = await mongoose.connect('mongodb+srv://admin:Administrator123@cluster0.q7rfn.mongodb.net/devault?retryWrites=true&w=majority', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        })

        console.log('MongoDB Connected.')
    }catch(e){
        console.error(e)
        process.exit()
    }
}

module.exports = connectDB