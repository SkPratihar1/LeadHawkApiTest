import { MongoClient } from 'mongodb';

class Database {
  private static instance: Database;
  private client: MongoClient;
  private connected: boolean = false;
  private url: string;
  private dbName: string;

  private constructor() {
    this.url = 'mongodb+srv://jackpete1228:LeadHawk@cluster0.bfxtoqi.mongodb.net/hawkio-dev?retryWrites=true&w=majority';
    this.dbName = 'hawkio-dev'; 
    this.client = new MongoClient(this.url);
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect() {
    if (!this.connected) {
      await this.client.connect();
      this.connected = true;
    }
  }

  public async disconnect() {
    if (this.connected) {
      await this.client.close();
      this.connected = false;
    }
  }

  public getDb() {
    if (!this.connected) {
      throw new Error('Database not connected');
    }
    return this.client.db(this.dbName);
  }
}

export default Database;
