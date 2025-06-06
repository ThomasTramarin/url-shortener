import express from "express";
import helmet from "helmet";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());

app.get("/", (req, res) => {
  res.json({
    msg: "CIAO",
  });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
