import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://jackpete1228:LeadHawk@cluster0.bfxtoqi.mongodb.net/hawkio-dev?retryWrites=true&w=majority'; // Replace with your MongoDB connection string

interface User {
  _id: string;
  email: string;
}

async function getVerificationCodeByEmail(email: string): Promise<string> {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db('hawkio-dev'); 
    const token = database.collection<User>('Token');
    
    const user = await token.findOne({ email: email });
    if (user && user._id ) {
      return user._id      ; 
    } else {
      throw new Error('User not found or verification code not set');
    }
  } finally {
    await client.close();
  }
}

export default getVerificationCodeByEmail;

