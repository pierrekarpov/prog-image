import { Request, Response, NextFunction } from 'express';

/**
 * Prevent unhandled promise rejections from being swallowed when using
 * async/await with express
 * @see https://www.acuriousanimal.com/2018/02/15/express-async-middleware.html
 */
export default (fn: Function) => (req: Request, res: Response, next?: NextFunction) =>
    Promise.resolve(fn(req, res, next)).catch(err => {
        console.error(err.stack);
        res.status(500).end();
    });
