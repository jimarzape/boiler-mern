import { Segments, Joi } from "celebrate";

export default {
  create: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
  update: {
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().allow("", null),
      update_password: Joi.boolean().required(),
    },
  },
  login: {
    [Segments.BODY]: {
      email: Joi.string().required(),
      password: Joi.string().required(),
    },
  },
};
