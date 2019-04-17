import PatientModel from "../models/patient";

const PatientModelWorker = new PatientModel().getModel();

export default class PatientService {
  public getPatients() {
    return PatientModelWorker.find().exec();
  }

  public async postPatient(patientData: object) {
    const patient = await PatientModelWorker.findOne({
      mrn_number: (patientData as any).mrn_number
    });
    if (patient) {
      return Promise.reject("Error: This MRN exists in DB");
    }
    const newPatient = new PatientModelWorker(patientData);
    return newPatient.save();
  }
}
