import mongoose from "mongoose";

const Schema = mongoose.Schema;

export default class UserModel {
  private userSchema: mongoose.Schema;
  constructor() {
    this.userSchema = new Schema({
      password_digest: {
        required: true,
        type: String,
      },
      username: {
        required: true,
        type: String,
      },
    });
  }

  public getModel() {
    return mongoose.model("User", this.userSchema);
  }
}
