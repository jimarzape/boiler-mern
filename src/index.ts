import app from "./config/express";
import connectDB from "./config/database";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running at ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed", err);
    process.exit(1);
  });
