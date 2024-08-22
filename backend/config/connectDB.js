import mongoose from 'mongoose';

const connectDB = async (maxRetries = 5, retryDelay = 5000) => {
    let attempt = 0;

    while (attempt < maxRetries) {
        try {
            const dbConnection = await mongoose.connect(process.env.MONGO_URL, {
                dbName: 'RQ_Analytics',
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log(`MONGODB CONNECTED ✅, CONNECTION HOST: ${dbConnection.connection.host}`);
            return;
        } catch (error) {
            attempt++;
            console.error(`MongoDB connection error (attempt ${attempt}/${maxRetries}):`, error);

            if (attempt >= maxRetries) {
                console.error('Max retries reached. Exiting process...');
                process.exit(1);
            }

            await new Promise(res => setTimeout(res, retryDelay));
        }
    }
};

export default connectDB;
