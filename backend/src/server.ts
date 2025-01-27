import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { fetchAndStoreTags, getTags } from "./controllers/tagController";
import { fetchQuotes, getQuotesFromDB } from "./controllers/quoteController";

import axios from 'axios';

// Set the Authorization header globally for all requests
axios.defaults.headers.common['Authorization'] = `Token token="217a4821740f8b85f5bcee4fb3b754ad"`;

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));

app.get("/api/tags", getTags);
// app.post("/api/fetch-tags", fetchAndStoreTags);
// app.get("/api/quotes", fetchQuotes);
app.get("/api/quotes", getQuotesFromDB);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
