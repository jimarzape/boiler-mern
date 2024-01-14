const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
      immutable: true,
      default: () => Date.now(),
    },
    updated_at: {
      type: Date,
      default: () => Date.now(),
    },
    deleted_at: { type: Date, default: null },
  },
  {
    collection: "users",
  }
);

userSchema.methods.softDelete = function () {
  this.deleted_at = new Date();
  return this.save();
};

userSchema.methods.restore = function () {
  this.deleted_at = null;
  return this.save();
};

// Create the model
const User = mongoose.model("User", userSchema);

export default User;
