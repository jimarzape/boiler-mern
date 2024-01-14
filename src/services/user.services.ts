import User from "../models/User.schema";
import { userCreate, userLogin, userUpdate } from "../types/User.type";
import { generateHash, verifyHash } from "../utilities/encryptionUtils";

const create = async (params: userCreate) => {
  try {
    const { name, email, password } = params;
    const hashed = await generateHash(password, Number(10));

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return await user.save();
  } catch (error) {
    throw error;
  }
};

const byEmail = async (email: string) => {
  try {
    return await User.findOne({ email });
  } catch (e) {
    throw e;
  }
};

const login = async (params: userLogin) => {
  const { email, password } = params;
  const user = await byEmail(email);

  if (user) {
    if (await verifyHash(password, user.password)) {
      return user;
    }
  }
  return null;
};

const getUserById = async (id) => {
  try {
    return await User.findById(id);
  } catch (e) {
    throw e;
  }
};

const update = async function name(params: userUpdate) {
  const { id, name, email, password, update_password } = params;
  const users = await User.findById(id);
  if (users) {
    users.name = name;
    users.email = email;
    if (update_password) {
      users.password = await generateHash(password, Number(10));
    }

    return await users.save();
  }

  return false;
};

const softDelete = async (id) => {
  try {
    const user = await User.findById(id);
    if (user) {
      await user.softDelete();
    }

    return true;
  } catch (e) {
    throw e;
  }
};

export default {
  create,
  byEmail,
  login,
  getUserById,
  update,
  softDelete,
};
