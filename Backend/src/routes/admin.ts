import express from "express";
import AdminControllers from "../controllers/admin";

export default class AdminRouter {
  public instance: express.Router = express.Router();
  private adminControllers: AdminControllers;

  constructor() {
    this.adminControllers = new AdminControllers();
    this.instance.post("/signup", this.adminControllers.signup);
    this.instance.post("/login", this.adminControllers.login);
    this.instance.get("/config", this.adminControllers.getConfig);
    this.instance.post("/config", this.adminControllers.setConfig);
  }
}
