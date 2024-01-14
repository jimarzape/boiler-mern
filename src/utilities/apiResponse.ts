import { Response } from "express";
import httpStatusCodes from "http-status-codes";
require("dotenv").config();
const cookieConfig =
  process.env.NODE_ENV == "local"
    ? {
        secure: true,
        httpOnly: false,
      }
    : {
        secure: true,
        httpOnly: false,
      };

export interface IOverrideRequest {
  code: number;
  message: string;
  positive: string;
  negative: string;
}

export interface ICookie {
  key: string;
  value: string;
}
export default class ApiResponse {
  static result = (
    res: Response,
    data: object,
    status: number = 200,
    cookie: ICookie = null
  ) => {
    res.status(status);
    if (cookie) {
      res.cookie(cookie.key, cookie.value);
    }
    res.json({
      data,
      success: true,
    });
  };

  static download = (
    res: Response,
    file,
    status: number = 200,
    cookie: ICookie = null
  ) => {
    res.status(status);
    // if (cookie) {
    //   res.cookie(cookie.key, cookie.value);
    // }
    res.download(file.location, file.name, (err) => {
      console.log(err);
      // throw err;
    });
  };

  static error = (
    res: Response,
    status: number = 400,
    error: string = httpStatusCodes.getStatusText(status),
    override: IOverrideRequest = null
  ) => {
    res.status(status).json({
      override,
      error: {
        message: error,
      },
      success: false,
    });
  };

  static setCookie = (res: Response, key: string, value: string) => {
    res.cookie(key, value);
  };
}
