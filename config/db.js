// connectDB : établit la connexion à MongoDB via Mongoose en utilisant MONGO_URI, et stoppe le process si la connexion échoue

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté avec succès');
  } catch (error) {
    console.error('Erreur de connexion MongoDB :', error.message);
    process.exit(1);
  }
};

export default connectDB;
