import { NextFunction, Request, Response } from "express";
import httpStatusCodes from "http-status-codes";

import Users from "../types/Users";
import IRequest from "../types/IRequest";
import ApiResponse from "./apiResponse";

const extractUserIdFromRequest = (req: IRequest) => {
  return req.users && req.users.id;
};

const extractQueryForRequest = (req: Request, query: string) => {
  if (req.query[query]) {
    // @ts-ignore
    return JSON.parse(req.query[query]);
  }
  return [];
};

const extractCookieFromRequest = (req: Request, key: string) => {
  // console.log("req.headers", req.headers);
  if (req.headers.authorization) {
    return req.headers.authorization;
  }
  if (req.headers.cookie) {
    const results = req.headers.cookie.split(";");
    const filtered = results.filter((result: string) => {
      return result.startsWith(`${key}=`);
    });
    if (filtered.length > 0) {
      return filtered[0].split("=")[1];
    }
  }

  if (req.headers.ats_cookie) {
    // console.log("req.headers.ats_cookie", req.headers.ats_cookie);
    const results = [req.headers.ats_cookie.toString()];
    const filtered = results.filter((result: string) => {
      return result.startsWith(`${key}=`);
    });
    if (filtered.length > 0) {
      // console.log("filtered[0].split('=')[1]", filtered[0].split("=")[1]);
      return filtered[0].split("=")[1];
    }
  }
  return null;
};

const sanitizeUser = (user: Users) => {
  const { password, ...userWithOutPassword } = user;
  return userWithOutPassword;
};

const restrictToStaff = (req: IRequest, res: Response, next: NextFunction) => {
  if (!req.users) {
    ApiResponse.error(res, httpStatusCodes.FORBIDDEN);
    return;
  }
  next();
};

export {
  extractUserIdFromRequest,
  extractQueryForRequest,
  sanitizeUser,
  extractCookieFromRequest,
  restrictToStaff,
};
