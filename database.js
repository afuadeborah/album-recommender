import mongoose from 'mongoose';

const MONGO_URI = 'mongodb://127.0.0.1:27017/ar_details';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('Mongo error:', error));