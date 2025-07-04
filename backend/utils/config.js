import dotenv from 'dotenv';
dotenv.config();
const { NODE_ENV, MONGO_LOCAL, MONGO_PROD, PORT, JWT_SECRET } = process.env

if (!MONGO_LOCAL || !MONGO_PROD || !NODE_ENV || !PORT || !JWT_SECRET) {
    console.error('Set the Environment Variables!!');
    process.exit(1);
}

export const jwtSecret = JWT_SECRET;
export const serverPort = PORT;
export const MongoUrl = NODE_ENV === 'development' ? MONGO_LOCAL : MONGO_PROD;