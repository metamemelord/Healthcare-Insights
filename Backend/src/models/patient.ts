import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default class PatientModel {
  private patientSchema: mongoose.Schema;
  constructor() {
    this.patientSchema = new Schema({
      attending_doctor_name: {
        required: true,
        type: String // PV1.7.3
      },
      date_of_admission: {
        required: true,
        type: Date // MSH.7
      },
      diagnostic_service: {
        type: String // OBR.24
      },
      dob: {
        required: true,
        type: Date // PID.7
      },
      employment_illness_indicator: {
        type: String // PV2.15
      },
      escort_required: {
        type: String // OBR.42
      },
      expected_discharge_date: {
        type: Date // PV2.9
      },
      handicap: {
        type: String // NK1.36 (prioritize) or IN1.48
      },
      hospital_service: {
        type: String // PV1.10
      },
      mrn_number: {
        required: true,
        type: String // PID.3.1
      },
      new_born_indicator: {
        type: String // PV2.36
      },
      patient_class: {
        type: String // PV1.2
      },
      referring_doctor_name: {
        type: String // PV1.8
      },
      retention_indicator: {
        type: String // PV2.37
      },
      special_program_code: {
        type: String // PV2.18
      },
      transport_arranged: {
        type: String // OBR.41
      },
      transport_mode: {
        type: String // OBR.30
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
