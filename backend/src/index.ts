import express from "express";
import "dotenv/config";
const app = express();
import cors from "cors";
import authRoute from "./routes/authRoute";
import projectRoute from "./routes/projectRoute";
import memberRoute from "./routes/memberRoute";
import inviteRoute from "./routes/inviteRoute";
import taskRoute from "./routes/taskRoute";
import activityRoute from "./routes/activityRoute";

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoute);
app.use("/api/projects", projectRoute);
app.use("/api/member", memberRoute);
app.use("/api/invite", inviteRoute);
app.use("/api/task", taskRoute);
app.use("/api/activity", activityRoute);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
