import { MongoClient, Collection } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI as string;
let client: MongoClient;

export async function connectUsers(): Promise<Collection> {
    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }
    return client.db("User").collection("Users");
}