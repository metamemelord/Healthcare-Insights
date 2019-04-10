import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import AdminRouter from "./routes/admin";
import PatientRouter from "./routes/patient";
import Server from "./server";
import FsWatcherService from "./services/WatcherService";
const server = new Server();
const patientRouter = new PatientRouter().instance;
const adminRouter = new AdminRouter().instance;
dotenv.config();

server.setMiddleWares([bodyParser.json()]);
server.setRouters([patientRouter, adminRouter]);

server.app.use((error: Error, req: any, res: any, next: any) => {
  console.error(error); // tslint:disable-line
  res.status(req.httpStatusCode ? req.httpStatusCode : 500).send(error);
});

/* tslint:disable */
mongoose
  .connect(
    (process.env as any).MONGO_DB_URI,
    { useNewUrlParser: true }
  )
  .then(result => {
    server.start();
    console.log("Connected to DB");
    const fsWatcher = new FsWatcherService();
    fsWatcher.start();
  })
  .catch(err => { 
    console.error("Could not connect to DB");
  });
/* tslint:enable */
