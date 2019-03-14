import express from "express";

export default class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
    this.app.use((error: Error, req: any, res: any, next: any) => {
      console.error(error.name);
      res.status(req.httpStatusCode ? req.httpStatusCode : 500).send(error);
      next();
    });
  }

  public setMiddleWares(middlewares: any[]) {
    for (const middleware of middlewares) {
      this.app.use(middleware);
    }
  }

  public setRouters(routers: express.Router[]) {
    for (const router of routers) {
      this.app.use(router);
    }
  }

  public start() {
    const port = process.env.PORT || 3000;
    this.app.listen(port, (error: Error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Server listening on port ${port}`);
      }
    });
  }
}
