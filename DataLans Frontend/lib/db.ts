import { createClient } from '@astrajs/collections';

let astraClient: any = null;

export async function getAstraClient() {
  if (astraClient === null) {
    astraClient = await createClient({
      astraDatabaseId: process.env.ASTRA_DB_ID,
      astraDatabaseRegion: process.env.ASTRA_DB_REGION,
      applicationToken: process.env.ASTRA_DB_APPLICATION_TOKEN,
    });
  }
  return astraClient;
}

export async function getPostsCollection() {
  const client = await getAstraClient();
  return client.namespace(process.env.ASTRA_DB_KEYSPACE).collection('posts');
}

export async function getUsersCollection() {
  const client = await getAstraClient();
  return client.namespace(process.env.ASTRA_DB_KEYSPACE).collection('users');
}

export async function getCommentsCollection() {
  const client = await getAstraClient();
  return client.namespace(process.env.ASTRA_DB_KEYSPACE).collection('comments');
}