import PatientModel from "../models/patient";

const Patient = new PatientModel().getModel();

export const postPatient = async (patientData: object) => {
  const patient = await Patient.findOne({
    mrn_number: (patientData as any).mrn_number
  });
  if (patient) {
    return Promise.reject("Error: This MRN exists in DB");
  }
  const newPatient = new Patient(patientData);
  return newPatient.save();
};
