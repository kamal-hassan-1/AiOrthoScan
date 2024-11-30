const { MongoClient } = require('mongodb');

let db;
let client;

module.exports = async () => {
    const connString = process.env.MONGO_URI;
    if (!connString) throw new Error('MONGODB_CONNECTION_STRING environment variable is not set');

    if (!client) {
        client = new MongoClient(connString);

        await client.connect();
        console.log('Connected to MongoDB');

        db = client.db();
    }

    return db;
}
