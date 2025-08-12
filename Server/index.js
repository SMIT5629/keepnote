const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const connectDB = require('./config/db');

const app = express();
dotenv.config();
app.use(cors({
    origin: 'https://keepnote-client.onrender.com', // or your frontend URL
    credentials: true
}));
<<<<<<< HEAD
=======
app.options('*', cors());
>>>>>>> 30b7e7f805d3a92cc3fcea577b721aa57a3b21e1

app.use(express.json());
connectDB();

app.use('/api/auth', authRoutes);

app.use('/api/notes', noteRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to KEEPnote API');
});

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});
