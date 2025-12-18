require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const router = require('./routes/note');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: 'http://localhost:5173', // or your React URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // allow cookies, tokens, auth headers
  }),
);
app.use(express.json());
app.use('/api/v1/note', router);
app.use('/health', (req, res) => {
  res.send('server is good');
});

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port-${PORT}`);
});
