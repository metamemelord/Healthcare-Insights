import { NextFunction, Request, Response } from "express";

export default class PatientControllers {
  public getAllPatients = (req: Request, res: Response, next: NextFunction) => {
    res.send("Ok");
  }
}
