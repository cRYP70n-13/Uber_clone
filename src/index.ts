import { Options } from 'graphql-yoga';
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';
import app from './app';
import connectionsOptions from './ormConfig';

/**
 * @desc The dotEnv configuration
 * @param {*} None
 * @return Nothing just setting my vars up
 */
dotenv.config();

/**
 * @desc The configurations for my Express instance
 * @param {*} None
 * @return {*} None
 */
const PORT : number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT : string = '/playground';
const GRAPHQL_ENDPOINT : string = '/graphql';

/**
 * @desc Using the defined Options in the instance of the app
 * @param {*} None
 * @return {*} None
 */
const appOptions : Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
}

const handleAppStart = () => console.log(`Listening on port ${PORT}`)

/**
 * @desc The database connection and the entryPoint of our server
 * @param {*} ConnectionOptions
 * @return {*} None 
 */
createConnection(connectionsOptions)
    .then(() => {
        app.start(appOptions, handleAppStart);
    }).catch(e => console.log(e));