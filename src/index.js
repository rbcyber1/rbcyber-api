import "dotenv/config";
import express from "express";
import ipRoutes from "./routes/ip.js";

const app = express();
const port = process.env.RBCYBER_API_PORT || 8000;

app.use(express.json());
app.use("/ip", ipRoutes);

app.listen(port, () => {
    console.log(`API running on port ${port}`);
});
