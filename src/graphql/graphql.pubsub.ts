import { RedisPubSub } from 'graphql-redis-subscriptions';
import { env } from '../utils/env';

export const redisPubSub = new RedisPubSub({
  connection: {
    connectTimeout: 200000,
    host: env.REDIS_HOST,
    port: +env.REDIS_PORT,
    password: env.REDIS_PASS,
    retryStrategy: (times: number) => Math.min(times * 50, 2000)
  }
});

export const PubSub = {
  provide: 'PUB_SUB',
  useValue: redisPubSub
};
