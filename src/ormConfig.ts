import { ConnectionOptions } from 'typeorm';

/**
 * @desc The connection options for the server with Postgres
 * @param {*} None just the config Objects
 * @return {*} I'm exporting this object
 */
const connectionsOptions: ConnectionOptions = {
    type: "postgres",
    database: 'uber',
    synchronize: true,
    logging: true,
    entities: [
        "entities/**/*.*"
    ],
    host: process.env.DB_ENDPOINT,
    port: 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};

export default connectionsOptions;