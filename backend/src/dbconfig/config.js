import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from "mongoose";

const connectionString = 'mongodb+srv://trippy-cluster0.qo2gbyq.mongodb.net/?authSource=%24external&authMechanism=MONGODB-X509&retryWrites=true&w=majority';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true,
    sslKey: `${__dirname}/cert.pem`,
    sslCert: `${__dirname}/cert.pem`,
    keepAlive: true,
    keepAliveInitialDelay: 300000,
}

let connection = null;

const getConnection = async () => {
    if(connection === null) {
        try {
            connection = await connect();
        } catch(error) {
            console.log(error);
        }
    }
    return connection;
}

async function connect() {
    console.log('connecting to db...')
    return new Promise((resolve, reject) => {
        mongoose.connect(connectionString, options, (err, res) => {
            if (err) {
                console.log('MongoDB Connection Failed');
                reject(err);
            } else {
                console.log('MongoDB Connected');
                resolve(res);
            }
        })
    })
}

export default getConnection