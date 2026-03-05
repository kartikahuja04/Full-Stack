import mongoose from 'mongoose';


const MONGO_URI = "mongodb+srv://kartikahuja:uGPUHYwSScbaBaRq@cluster0.xxduv6i.mongodb.net/?appName=Cluster0";
console.log('MongoDB URI:', MONGO_URI);

export const connectMongo = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};
