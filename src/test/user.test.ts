import mongoose from "mongoose";
import User from "../models/User.schema";
import { connectDBForTesting, disconnectDBForTesting } from "./db";
import { faker } from "@faker-js/faker";

describe("User Model Tests", () => {
  beforeAll(async () => {
    await connectDBForTesting();
  });

  afterAll(async () => {
    await User.deleteMany({});
    await disconnectDBForTesting();
  });

  it("should create a new user", async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "password123",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
  });

  it("should not allow duplicate email addresses", async () => {
    const userData1 = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    };

    const userData2 = {
      name: "Jane Doe",
      email: "john@example.com", // Same email as userData1
      password: "password456",
    };

    // Save the first user
    const user1 = new User(userData1);
    await user1.save();

    // Attempt to save the second user with the same email
    const user2 = new User(userData2);

    try {
      await user2.save();
      // If the save succeeds, it's an unexpected behavior, so fail the test
      fail("Expected to throw a duplicate key error");
    } catch (error) {
      // Check if the error is a MongoServerError with a specific code for duplicate key
      expect(error.code).toBe(11000); // 11000 is the MongoDB code for duplicate key error
    }
  });

  it("should soft delete a user", async () => {
    const userData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: "password123",
    };

    const user = new User(userData);
    const savedUser = await user.save();

    // Soft delete the user
    await savedUser.softDelete();

    // Attempt to find the soft-deleted user
    const deletedUser = await User.findOne({
      _id: savedUser._id,
      deleted_at: null,
    });

    expect(deletedUser).toBeNull(); // User should not be found
    expect(savedUser.deleted_at).not.toBeNull(); // Deleted_at field should be set
  });
});
