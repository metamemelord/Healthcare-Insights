import express from "express";
import PatientControllers from "../controllers/patient";

export default class PatientRouter {
  public instance: express.Router = express.Router();
  private patientControllers: PatientControllers;

  constructor() {
    this.patientControllers = new PatientControllers();
    this.instance.get("/", this.patientControllers.getAllPatients);
  }
}
