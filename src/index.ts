// import express, { Request, Response, Application } from 'express';

// const app: Application = express();
// const PORT = process.env.PORT || 8000;

// app.get("/", (req: Request, res: Response): void => {
//     res.send("Hello Typescript with Node.js!")
// });

// app.listen(PORT, (): void => {
//     console.log(`Server Running here 👉 https://localhost:${PORT}`);
// });

import app from './app';
import models from './db/models';
const { sequelize } = models;
const PORT = process.env.PORT || 8000;
const DB_HOST = process.env.DB_HOST || '127.0.0.1';
const DB_PORT = process.env.DB_PORT || 3306;


app.on('ready', () => {
    app.listen(PORT, () => {
        console.log(`Listening on http://localhost:${PORT}`);
    });
});

// Only start server if db is alive
Promise.all([sequelize.authenticate()])
    .then(() => {
        console.log(`Connected to mysql://${DB_HOST}:${DB_PORT}`);
        app.emit('ready');
    })
    .catch(err => {
        console.error(`App Init ${err.stack}`);
        throw err;
    });
