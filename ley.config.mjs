import dotenv from 'dotenv';

// import { setEnvironmentVariables } from './util/config.mjs';

// setEnvironmentVariables();

dotenv.config();
const options = { ssl: Boolean(process.env.POSTGRES_URL) };
export default options;
