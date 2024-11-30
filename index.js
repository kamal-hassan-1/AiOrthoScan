const express = require('express')
const path = require('path');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv'); // something related to database
dotenv.config(); //loads environment variables

const bodyParser = require('body-parser');
const connectDB = require('./config/db.js');

const session = require('express-session')

const authRouter = require('./auth.js');
const dashboardRouter = require('./dashboard.js');
const aiRouter = require('./aiDiagnosis.js');

const port = process.env.PORT || 3500;

const app = express()
// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use('/public/images', express.static(path.join(__dirname, 'Images')));
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend URL
    credentials: true, // To allow cookies/session sharing
}));

app.use(session({
    secret: 'dancingLizard', // Replace with a secure, random string
    resave: false, // Prevents session from being saved back to the store unless modified
    saveUninitialized: false, // Prevents uninitialized sessions from being saved
    cookie: { maxAge: 60000 } // Session expiration time in milliseconds (e.g., 1 minute)
}));



async function startServer() {
    const db = await connectDB();

    app.use('/api/auth',authRouter(db));
    app.use('/api/main', dashboardRouter(db));
    app.use('api/Ai', aiRouter(db));

    app.get('/kamal', (req, res) => {
        res.send('API is running...');
    });
    
    app.listen(port)
}

startServer();