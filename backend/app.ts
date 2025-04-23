import express from "express";
import router from "./src/routes/route";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Welcome to my crm project");
});
export default app;
