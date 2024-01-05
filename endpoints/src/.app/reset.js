import commandExists from 'command-exists';
import chalk from 'chalk';
import { MongoClient } from 'mongodb';
import mongoUri from 'mongo-uri-tool';
import Loader from './loader';
import settings from '../lib/settings';

const resetDatabase = async (mongodb) => {
    const collections = mongodb && mongodb.db && (await mongodb.db.listCollections().toArray());

    for (let i = 0; i < collections.length; i += 1) {
        const collectionFromList = collections[i];
        const collectionName = collectionFromList && collectionFromList.name;
        const collection = collectionName && mongodb.db.collection(collectionName);
        if (collection) {
            await collection.remove();
        }
    }

    return true;
};

const getConnectionOptions = () => {
    const mongodbSettings = settings && settings.databases && settings.databases.mongodb;
    const uri = mongodbSettings && mongodbSettings.uri;

    if (!mongodbSettings || (mongodbSettings && !uri)) {
        throw new Error(
            chalk.redBright(
                'Must have a valid databases.mongodb.uri value in your settings-<env>.json file to connect to MongoDB.'
            )
        );
    }

    return {
        uri,
        parsedUri: mongoUri.parseUri(uri),
        options: Object.assign({}, mongodbSettings.options)
    };
};

const connectToMongoDB = async () => {
    const connectionOptions = getConnectionOptions();

    if (!process.mongodb && connectionOptions) {
        const mongodb = await MongoClient.connect(connectionOptions.uri, {
            poolSize: process.env.NODE_ENV === 'development' ? 10 : 100,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: 'admin',
            ssl: process.env.NODE_ENV !== 'development',
            ...connectionOptions.options
        });

        const db = mongodb.db(connectionOptions.parsedUri.db);

        return {
            db,
            Collection: db.collection.bind(db),
            connection: mongodb
        };
    }

    return null;
};

const warnMongoDBMissing = () => {
    console.warn(`
  ${chalk.red('MongoDB not installed.')}\n
  ${chalk.green('Download MongoDB at https://www.mongodb.com/try/download/community')}

  After installation, try to run this command again to start MongoDB alongside your app.\n
  `);
};

const reset = async () => {
    if (process.env.NODE_ENV !== 'development') {
        console.log(
            chalk.redBright(
                'To prevent catastrophic data loss, reset is disabled outside of your development environment.'
            )
        );
        process.exit(1);
    }

    process.isReset = true; // NOTE: Set this so we can signal context to dependencies.
    process.loader = new Loader();
    process.loader.start('Resetting database...');

    const mongodbExists = commandExists.sync('mongod');

    if (mongodbExists) {
        const mongodb = await connectToMongoDB();
        await resetDatabase(mongodb);

        process.loader.stable('Database reset!\n\n');
        process.exit();
    } else {
        process.loader.stop();
        warnMongoDBMissing();
        process.exit(1);
    }
};

(async () => reset())();
