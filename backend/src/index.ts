import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";
import initDb from "./db/initDb";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/errorHandler";
import authRouter from "./modules/auth/auth.router";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    msg: "CIAO",
  });
});

app.use("/api/auth", authRouter);

app.use(errorHandler);

app.listen(3000, () => {
  initDb();
  console.log("Server is running on http://localhost:3000");
});
