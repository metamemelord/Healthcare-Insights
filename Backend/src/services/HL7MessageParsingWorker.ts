import fs from "fs";
import hl7parser from "hl7parser";
import path from "path";
import moment from "moment"; // tslint:disable-line

export default class HL7MessageParsingWorker {
  private parsedData: object;
  constructor() {
    this.parsedData = {};
  }

  public parse(file: string) {
    return new Promise((resolve, reject) => {
      try {
        const hl7FileReadStream = fs.createReadStream(file, "utf-8");
        let hl7FileContents = "";
        hl7FileReadStream.on("data", (data: Buffer) => {
          hl7FileContents += data;
        });
        hl7FileReadStream.on("close", () => {
          let hl7Message = hl7FileContents; // tslint:disable-line
          // tslint:disable-next-line
          // hl7Message = `MSH|^~\&|AA1|AA1|OESEND_PM_PROD|a|20150218023235|e|ADT^A01|uniqueorderID-1|P|2.3.1|1|1|AL|AL|IN|8859/1|q|\r\nPID|1|MPI0000030|AdmitAndUpdate^^^AA1^MR~MAMar1502^^^AA1^MA|ALT0000030|Admit_Update^First0030^Middle0030^S^Mr^Dr.|LNMom^FNMom^MNMom^SfxMom^PfxMom|19870106103300|M|a|ASN^Asian^ACR|Boulevard^U^New Jersey^WA^789-1211^United States|in|124-5478-9874^^^^^^567^^|124-5478-9875^^^^^678^^|EN|M^Married|HIN^Hindu|AN0000031|SSN0000031|DL0000031|MomID0031|H^Hispanic or Latino|NW|1|1|in|IndianID^IndianText\r\nEVN|A01|20150218023235\r\nPV1|1|E|ICU^Room198^1001|R|123|ba|ATID0030^Joe^John^ADMiddle0030^S^Dr.^AD|RDID0030^Doctor0030^Referring0030^RDMiddle0030^S^Dr.^RD|CDID0030^Doctor0030^Consulting0030^CDMiddle0030^S^Dr.^CD|MED|b|A|R||A2|1|ADID0030^Doctor0030^Admitting0030^ADMiddle0030^S^Dr.^AD|inpatient|VN_Admit_Update|1|1|1|1|1|11|1|1|1|1|1|1|1|1|1|1|11|1|1|1|1|1|1|1|20150218|1|1|1|1|1|1|A|\r\nOBR|1|NewOrderAndUpdate_11|NewOrderAndUpdate_11|333^EP2|h|20190410000000|20160728|20190411000000|q|q|q|q|Ultrasound Study comment stored in OBR-13. This should be populated in StudyComment field in Xcelera Study tab.|20190410000000|Radiology^^^^R|7101^ESTRADA^JAIME^P^^DR||ACCMar1503|Ultrasound|SPS2047|w|20190411000000|w|AU|A|q|1^once^^^^S|w|w|WALK|ReasonCode^This is reason for study.|w|w|TechId&LastTech&FirstTech&MidTech&SfxTech&PfxTech|w|20160728|w|w|w|w|A|N|w|P1^Procedure 1^ERL_MESA^^OBR44-5_RequestedProcedureDescription|\r\nPV2|B|12|in|a|de|we|HO|20190410000000|20190413000000|y|w|y|w|20190401000000|Y|D|20190409000000|CH|Y|a|F|Y|a|AI|1|20190410000000|a|20190410000000|20190410000000|a|a|Y|20190411000000|Y|Y|Y|Y|A|U|CH|A|A|F|F|DNR|20190410000000|20190410000000|20190410000000|`;
          // fs.writeFileSync(path.join(__dirname, "..", "sample-message.txt"), hl7Message);
          this.parsedData = this.convertHL7ToJson(hl7Message);
          resolve(this.parsedData);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  private parseDate(arg: string): string {
    if (arg) {
      return `${arg.substr(0, 4)}-${arg.substr(4, 2)}-` +
      `${arg.substr(6, 2)} ${arg.substr(8, 2)}:${arg.substr(10, 2)}:${arg.substr(12, 2)}`;
    }
    return "";
  }
  private convertHL7ToJson(message: string) {
    const parsedMessage = hl7parser.create(message);
    return {
      attending_doctor_name:
        parsedMessage.get("PV1.7.3").toString() +
        " " +
        parsedMessage.get("PV1.7.2").toString(),
      diagnostic_service: parsedMessage.get("OBR.24").toString(),
      dob: moment(this.parseDate(parsedMessage.get("PID.7").toString())),
      expected_discharge_date:  moment(this.parseDate(parsedMessage.get("PV2.9").toString())),
      hospital_service: parsedMessage.get("PV1.10").toString(),
      mrn_number: parsedMessage.get("PID.3.1").toString(),
      new_born_indicator: parsedMessage.get("PV2.36").toString(),
      patient_class: parsedMessage.get("PV1.2").toString(),
      referring_doctor_name:
        parsedMessage.get("PV1.8.3").toString() +
        " " +
        parsedMessage.get("PV1.8.2").toString(),
      retention_indicator: parsedMessage.get("PV2.37").toString(),
      trigger_event: parsedMessage.get("MSH.9.2").toString()
    };
  }
}
