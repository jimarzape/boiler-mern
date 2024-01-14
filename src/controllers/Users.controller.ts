import httpStatusCodes from "http-status-codes";
import IController from "../types/IController";
import apiResponse from "../utilities/apiResponse";
import { generateCookie } from "../utilities/encryptionUtils";
import constants from "../constants";
import locale from "../constants/locale";
import { extractCookieFromRequest } from "../utilities/apiUtilities";
import { verifyCookie } from "../utilities/encryptionUtils";
import IdentiFy from "../middleware/sessionHandler";
import { userCreate, userLogin, userUpdate } from "../types/User.type";
import userServices from "../services/user.services";

const create: IController = async (req, res) => {
  try {
    const param = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    } as userCreate;
    const user = await userServices.create(param);
    apiResponse.result(res, user, httpStatusCodes.CREATED);
  } catch (e) {
    if (e.code === 11000) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS
      );
      return;
    }
  }
};

const update: IController = async (req, res) => {
  try {
    const param = {
      id: req.params.id,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      update_password: req.body.update_password,
    } as userUpdate;
    const user = await userServices.create(param);
    apiResponse.result(res, user, httpStatusCodes.OK);
  } catch (e) {
    if (e.code === 11000) {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.EMAIL_ALREADY_EXISTS
      );
      return;
    }
  }
};

const login: IController = async (req, res) => {
  try {
    const param = {
      email: req.body.email,
      password: req.body.password,
    } as userLogin;
    const user = await userServices.login(param);
    if (user) {
      const cookie = await generateUserCookie(user._id);
      apiResponse.result(res, user, httpStatusCodes.OK, cookie);
    } else {
      apiResponse.error(
        res,
        httpStatusCodes.BAD_REQUEST,
        locale.INVALID_CREDENTIALS
      );
    }
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
    return;
  }
};

const logout: IController = async (req, res) => {
  const user = await IdentiFy(req);
  if (user) {
    res.clearCookie("user");
    apiResponse.result(res, { message: "user logout" }, httpStatusCodes.OK);
  } else {
    apiResponse.error(
      res,
      httpStatusCodes.BAD_REQUEST,
      locale.INVALID_CREDENTIALS
    );
  }
};

const generateUserCookie = async (userId: number) => {
  return {
    key: constants.Cookie.COOKIE_USER,
    value: await generateCookie(
      constants.Cookie.KEY_USER_ID,
      userId.toString()
    ),
  };
};

const softDelete: IController = async (req, res) => {
  try {
    await userServices.softDelete(req.params.id);
    apiResponse.result(
      res,
      { message: "User has been deleted" },
      httpStatusCodes.OK
    );
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

const byId: IController = async (req, res) => {
  try {
    const user = await userServices.getUserById(req.params.id);
    apiResponse.result(res, user, httpStatusCodes.OK);
  } catch (e) {
    apiResponse.error(res, httpStatusCodes.BAD_REQUEST, e.message);
  }
};

export default {
  create,
  login,
  logout,
  update,
  softDelete,
  byId,
};
