import express from "express";
import router from "./src/routes/route";
import corsMiddleware from "./src/middlewares/corsMiddleware";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(corsMiddleware);
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to my crm project");
});
export default app;
