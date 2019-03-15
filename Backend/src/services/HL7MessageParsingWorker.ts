import fs from "fs";
import hl7parser from "hl7parser";
import IParsedPatientDataCollection from "./IParsedPatientDataCollection";

export default class HL7MessageParsingWorker {
  private parsedData: IParsedPatientDataCollection;
  constructor() {
    this.parsedData = {
      messages: []
    };
  }

  public getAsJson() {
    return this.parsedData;
  }

  public parse(file: string) {
    fs.readFile(file, (err, data) => {
      if (err) {
        throw new Error("Could not load the file");
      } else {
        //const hl7Messages = data.toString().split("/n");
        const hl7Messages = `MSH|^~\&|MESA_OF|XYZ_RADIOLOGY|MESA_IM|XYZ_IMAGE_MANAGER|20170606080000||ADT^A01||P|2.3.1||||||8859/1
EVN|A01|20170606080000
PID||PIDJun061701|ISPADTA01^^^VHIS~MAJun061701^^^VHIS^MA|AltJun061701|LNJun061701^FNJun061701^MNJun061701^Hon.^Mr.^GM|LNMom^FNMom^MNMom^SfxMom^PfxMom|198111101112|F||ASN^Asian|Boulevard^U^New Jersey^WA^789-1211^United States||124-5478-9874^^^^^^567|124-5478-9875^^^^^678||M^Married|HIN^Hindu|ANJun061701|SSJun061701|DLJun061701|MomID|WHT||N|0|||American
PV1||I|ICU^RM^001^VHIS||||ADID^AttendingLast^AttendingFirst^AttendingMiddle^ADSfx^ADPfx|5101^NELL^FREDERICK^P^RefSfx^DR||||||||1|ADID^ADLast^ADFirst^ADMiddle^ADSfx^ADPfx||VNJun061701^^^VHIS|||||||||||||||||||||||||200007010800|||||||V
AL1|1|DRUG|00000741^OXYCODONE||HYPOTENSION
`;
        console.log(
          "***********************\n",
          data.toString(),
          "***********************\n"
        );
        // hl7Messages.forEach((message: string) => {
        //   console.log(
        //     "--------------------------------------------------------------------------------------------",
        //     message
        //   );
        //   this.parsedData.messages.push(this.convertHL7ToJson(message));
        //   console.log(
        //     "--------------------------------------------------------------------------------------------",
        //     this.parsedData
        //   );
        // });
        console.log(
          "*****************************\n",
          this.parsedData,
          "*****************************\n"
        );
        this.parsedData.messages.push(this.convertHL7ToJson(hl7Messages));
        console.log(
          "*****************************\n",
          this.parsedData,
          "*****************************\n"
        );
      }
    });
  }

  private convertHL7ToJson(message: string) {
    const parsedMessage = hl7parser.create(message);
    // Write code to parse the message, extract requried fields and return the object
    return {
      attending_doctor_name: parsedMessage.get("PV1.7").toString(),
      diagnostic_service: parsedMessage.get("OBR.24").toString(),
      dob: parsedMessage.get("PID.7").toString(),
      expected_discharge_date: parsedMessage.get("PV2.9").toString(),
      hospital_service: parsedMessage.get("PV1.10").toString(),
      mrn_number: parsedMessage.get("PID.3.1").toString(),
      new_born_indicator: parsedMessage.get("PV2.36").toString(),
      patient_class: parsedMessage.get("PV1.2").toString(),
      referring_doctor_name: parsedMessage.get("PV1.8").toString(),
      retention_indicator: parsedMessage.get("PV2.37").toString(),
      trigger_event: parsedMessage.get("MSH.9.2").toString()
    };
  }
}
