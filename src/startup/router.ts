// import { register as questionRegisterRoutes } from '../routes/question.route';
// import { register as nodeRegisterRoutes } from '../routes/node.router';

import express from 'express'


export class Router {
    private _app: express.Application;

    constructor(app: express.Application) {
        this._app = app;
    }
    public init = async (): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            try {
                this._app.get("/api/v1", (req, res) => {
                    res.send({ message: "Demo api service" })
                })

                // questionRegisterRoutes(this._app);
                // nodeRegisterRoutes(this._app);
            } catch (error) {
                console.log("Error initilizing the routes")
            }
        });
    }
}
