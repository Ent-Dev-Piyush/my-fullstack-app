import express, { Application, Request, Response } from "express";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";
import ejs from "ejs";
import Routes from "./routes/index.js";
import cors from "cors";
// import { sendEmail } from "./config/mail.js";

const app: Application = express();

const PORT = process.env.PORT || 5000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(appLimiter);

// * Set view engine
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "./views"));

//Routes
app.use(Routes);

app.get("/", async (req: Request, res: Response) => {
  try {
    const html = await ejs.renderFile(__dirname + "/views/emails/welcome.ejs", {
      name: "Champak",
    });
    // await sendEmail("dipog38626@inkight.com", "Test Subject", html);
    await emailQueue.add(emailQueueName, {
      to: "dipog38626@inkight.com",
      subject: "Test using redis",
      body: html,
    });
    res.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to send email", error });
  }
});

// *redis
import "./jobs/index.js";
import { emailQueue, emailQueueName } from "./jobs/emailJob.js";
import { appLimiter } from "./config/rateLimit.js";

app.listen(PORT, () => {
  console.log(`Server running successfully on port - ${PORT}`);
});
