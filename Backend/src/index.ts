import bodyParser from "body-parser";
import mongoose from "mongoose";
import AdminRouter from "./routes/admin";
import PatientRouter from "./routes/patient";
import Server from "./server";
import FsWatcherService from "./services/WatcherService";

const server = new Server();
const patientRouter = new PatientRouter().instance;
const adminRouter = new AdminRouter().instance;

server.setMiddleWares([bodyParser.json()]);
server.setRouters([patientRouter, adminRouter]);

server.app.use((error: Error, req: any, res: any, next: any) => {
  console.error(error);
  res.status(req.httpStatusCode ? req.httpStatusCode : 500).send(error);
});

mongoose
  .connect(
    "mongodb+srv://metamemelord:hehehasdele@dashboard-db-wvq8d.azure.mongodb.net/dashboard",
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
