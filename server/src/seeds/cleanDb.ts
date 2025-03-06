import models from '../models/index.js';
import db from '../config/connection.js';

export default async (modelName: "Question", collectionName: string) => {
  try {
    const model = models[modelName];

    if (!model || !model.db || !model.db.db) {
      console.error(`Model "${modelName}" does not exist or is not properly initialized.`);
      return;
    }

    let modelExists = await model.db.db.listCollections({ name: collectionName }).toArray();

    if (modelExists.length) {
      await db.dropCollection(collectionName);
    }
  } catch (err) {
    console.error("Error in cleanDb.ts:", err);
    throw err;
  }
};