import { NextFunction, Request, Response } from "express";
import PatientService from "../services/PatientService";

export default class PatientControllers {
  private patientService = new PatientService();
  public getAllPatients = async (req: Request, res: Response, next: NextFunction) => {
    const patients = await this.patientService.getPatients();
    res.status(200).send(patients);
  }
}
