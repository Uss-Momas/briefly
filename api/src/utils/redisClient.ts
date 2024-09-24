import { createClient } from 'redis';

export const redisClient = createClient({ url: 'redis://:@localhost:6379' });

redisClient.connect().catch((e) => {
    console.log("Couldnt connected", e.message);
});