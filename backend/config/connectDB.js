import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URL, {
            dbName: "RQ_Analytics"
        });
        console.log(`MONGODB CONNECTED ✅, CONNECTION HOST: ${dbConnection.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

export default connectDB;
