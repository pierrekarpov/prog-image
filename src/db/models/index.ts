import { Sequelize } from "sequelize-typescript";
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config.js`)[env];
import { DBInterface } from '../../../typings/db-interface';

import { StatusType } from "./StatusType";
import { FormatType } from "./FormatType";
import { Media } from "./Media";

const sequelize = new Sequelize({
    dialect: config.dialect,
    host: config.host,
    username: config.username,
    password: config.password,
    database: config.database,
    logging: false,
    models: [FormatType, StatusType, Media],
});


const db: { [key: string]: any } = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default <DBInterface>db;