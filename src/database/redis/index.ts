import Redis from 'ioredis';

const options = {
	password: 'password_pass'
};

const redis: Redis.Redis = new Redis(options);

export default redis;
