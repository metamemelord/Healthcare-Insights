import chokidar from "chokidar";
import path from "path";
import HL7MessageParsingWorker from "./HL7MessageParsingWorker";
import { postPatient } from "./PatientPostService";

const currentPath = path.join(__dirname, "../data/");

export default class FsWatcherService {
  private watcher: any;
  private hl7Parser: HL7MessageParsingWorker = new HL7MessageParsingWorker();
  public start() {
    this.watcher = chokidar.watch(currentPath, {
      ignored: /(^|[\/\\])\../,
      persistent: true
    });
    console.log(`Watching ${currentPath} for changes`); // tslint:disable-line
    this.watcher.on("add", (filePath: string) => this.handleAdd(filePath));
    // .on("change", (path: string) => this.handleAdd(path))
    // .on("unlink", (path: string) => this.handleAdd(path));
  }

  private async handleAdd(filePath: string) {
    process.stdout.write("Found a new file path, saving to DB... ");
    try {
      const parsedData = await this.hl7Parser.parse(filePath);
      // console.log(parsedData); // tslint:disable-line
      const result = await postPatient(parsedData);
      console.log(result); // tslint:disable-line
    } catch (err) {
      console.log(err); // tslint:disable-line
    }
  }
}
