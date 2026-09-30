const mongoose = require('mongoose');

/**
 * Connect to MongoDB with connection pooling and error listeners
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // Modern mongoose options are defaults, kept clean
    });

    console.log(`[MongoDB Connected]: Host: ${conn.connection.host}, Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`[MongoDB Connection Error]: ${error.message}`);
    // In production or critical startup failure:
    // process.exit(1);
  }
};

module.exports = connectDB;
