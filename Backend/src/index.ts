import Server from "./server";
import PatientRouter from "./routes/patient";

const server = new Server();
const patientRouter = new PatientRouter().instance;

server.setRouters([patientRouter]);

server.start();
