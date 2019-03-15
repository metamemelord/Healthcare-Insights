import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default class PatientModel {
  private patientSchema: mongoose.Schema;
  constructor() {
    this.patientSchema = new Schema({
      attending_doctor_name: {
        required: true,
        type: String // PV1.7
      },
      diagnostic_service: {
        required: true,
        type: String // OBR.24
      },
      dob: {
        required: true,
        type: Date // PID.7
      },
      expected_discharge_date: {
        required: true,
        type: Date // PV2.9
      },
      hospital_service: {
        required: true,
        type: String // PV1.10
      },
      mrn_number: {
        required: true,
        type: String // PID.3.1
      },
      new_born_indicator: {
        required: true,
        type: String // PV2.36
      },
      patient_class: {
        required: true,
        type: String // PV1.2
      },
      referring_doctor_name: {
        required: true,
        type: String // PV1.8
      },
      retention_indicator: {
        requierd: true,
        type: String // PV2.37
      },
      trigger_event: {
        required: true,
        type: String // MSH.9.2
      }
    });
  }

  public getModel() {
    return mongoose.model("Patient", this.patientSchema);
  }
}
