import chokidar from "chokidar";
import path from "path";
import HL7MessageParsingWorker from "./HL7MessageParsingWorker";
import postPatients from "./PatientPostService";

const currentPath = path.join(__dirname, "../data/");

export default class FsWatcherService {
  private watcher: any;
  private hl7Parser: HL7MessageParsingWorker = new HL7MessageParsingWorker();
  public start() {
    this.watcher = chokidar.watch(currentPath, {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
    console.log(`Watching ${currentPath} for changes`);
    this.watcher.on("add", (path: string) => this.handleAdd(path));
    // .on("change", (path: string) => this.handleAdd(path))
    // .on("unlink", (path: string) => this.handleAdd(path));
  }

  private handleAdd(filePath: string) {
    this.hl7Parser.parse(filePath);
    const parsedData = this.hl7Parser.getAsJson();
    postPatients(parsedData)
      .then(result => {
        postPatients(result)
          .then(result => {
            console.log("Patients added to DB");
          })
          .catch(err => {
            console.error("Could not save patients to DB");
          });
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      });
  }
}
