import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1/album_recommender';

const connectDatabase = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        })
        console.log('✅ MongoDB connected');
    } catch (error) {
        console.error('Mongo error:', error);
    }
};

export default connectDatabase;
