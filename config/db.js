// connectDB : établit la connexion à MongoDB via Mongoose en utilisant MONGO_URI, et stoppe le process si la connexion échoue
// setServers : force Node à interroger un DNS public plutôt que celui du routeur local, pour contourner les échecs de résolution SRV

import mongoose from 'mongoose';
import dns from 'dns';

dns.setServers(['8.8.8.8', '1.1.1.1']);

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
