require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => {
      console.log('DB Connected');
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectDB;
