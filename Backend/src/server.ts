import express from "express";

export default class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
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
        console.error(error); // tslint:disable-line
      } else {
        console.log(`Server listening on port ${port}`); // tslint:disable-line
      }
    });
  }
}
