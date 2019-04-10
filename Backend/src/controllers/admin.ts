import { NextFunction, Request, Response } from "express";

import bcrypt from "bcryptjs";
import UserModel from "../models/user";

const User = new UserModel().getModel();

export default class AdminControllers {
  public signup = (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
      .then((userFromDb: any) => {
        if (!userFromDb) {
          bcrypt
            .hash(password, 12)
            .then((hashedPassword: string) => {
              const user = new User({
                password_digest: hashedPassword,
                username
              });
              return user.save();
            })
            .then((result) => {
              res.status(201).json({ message: "User added", username: (result as any).username });
            })
            .catch((err: Error) => {
              console.log(err); // tslint:disable-line
              (req as any).httpStatusCode = 400;
              return next(err);
            });
        } else {
          (req as any).httpStatusCode = 409;
          next(new Error("User already exists"));
        }
      })
      .catch((err: Error) => {
        next(err);
      });
  }

  public login = (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({ username })
      .then((user: any) => {
        if (!user) {
          (req as any).httpStatusCode = 404;
          throw new Error("User does not exist");
        } else {
          bcrypt
            .compare(password, (user as any).password_digest)
            .then((success: any) => {
              if (success) {
                return res.status(200).send("Ok");
              } else {
                throw new Error("Invalid credentials");
              }
            })
            .catch((err: Error) => {
              if (!(req as any).httpStatusCode) {
                (req as any).httpStatusCode = 400;
              }
              next(err);
            });
        }
      })
      .catch((err: Error) => {
        if (!(req as any).httpStatusCode) {
          (req as any).httpStatusCode = 500;
        }
        next(err);
      });
  }
}
