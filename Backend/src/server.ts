import express from "express";

export default class Server {
  public app: express.Application;
  constructor() {
    this.app = express();
  }

  setRouters(routers: Array<express.Router>) {
    console.log(routers);
    for (let router of routers) {
      this.app.use(router);
    }
  }

  start() {
    let port = process.env.PORT || 3000;
    this.app.listen(port, (error: Error) => {
      if (error) {
        console.error(error);
      } else {
        console.log(`Server running on port ${port}`);
      }
    });
  }
}
