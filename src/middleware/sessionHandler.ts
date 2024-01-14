import { extractCookieFromRequest } from "../utilities/apiUtilities";
import constants from "../constants";
import { verifyCookie } from "../utilities/encryptionUtils";
import userService from "../services/user.services";

const IdentiFy = async (req) => {
  const authorizationHeader = extractCookieFromRequest(
    req,
    constants.Cookie.COOKIE_USER
  );
  const decoded = await verifyCookie(authorizationHeader);
  return await userService.getUserById(
    decoded.data[constants.Cookie.KEY_USER_ID]
  );
};

export default IdentiFy;
