import * as express from "express";
import UserRoute from "./users/index.route";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("ADACA API TEST");
});

router.use("/user", UserRoute);

export default router;
