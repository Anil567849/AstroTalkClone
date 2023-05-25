import dotenv from 'dotenv';
dotenv.config({path : './config/config.env'});
import mongoose from 'mongoose';

async function main() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('db connected');
    } catch (error) {
        console.log('db failed', error);
    }
}

main()