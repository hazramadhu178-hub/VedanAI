import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contact.js";

const app = express();
const port = Number(process.env.PORT) || 5001;

app.use(cors({
    origin: "https://vedanai.pages.dev",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

app.use("/api/contact", contactRoutes);

app.listen(port, () => {
    console.log(`Contact API listening on port ${port}`);
});