const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
// const connectDB = require('./config/db');

const app = express();
dotenv.config();
// app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173', // or your frontend URL
    credentials: true

    origin: 'https://keepnote-client.onrender.com', 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.options('*', cors());
console.log('ENV:', process.env);

app.use(express.json());
// connectDB();

app.use('/api/auth', authRoutes);

app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to KEEPnote API');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
