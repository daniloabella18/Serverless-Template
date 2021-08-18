const mongoose = require('mongoose');

const urlDatabase = 'mongodb+srv://danilo:1234@cluster0.hqfob.azure.mongodb.net/food?retryWrites=true&w=majority'

// Connecting to the database
mongoose.connect(urlDatabase, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB');
    }).catch((e) => {
        console.error('Error al conectar a MongoDB: ', e.message)
    })

module.exports = mongoose;