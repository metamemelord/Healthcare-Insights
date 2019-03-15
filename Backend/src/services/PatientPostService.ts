import PatientModel from "../models/patient";

const Patient = new PatientModel().getModel();

export default (patients: object) => {
    return new Promise((resolve, reject) => {
        Patient.insertMany(patients).then((result) => {
            resolve(result);
        }).catch((err) => {
            reject(err);
        });
    })
}