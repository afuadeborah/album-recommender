import dotenv from "dotenv";
import express from 'express';
import cors from "cors";
import authRouter from "./backend/routes/auth.js";
import noteRouter from "./backend/routes/note.js";
import connectDatabase from "./database.js";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
// allows cross-origin requests (Postman)
app.use(cors());

connectDatabase();

app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

dotenv.config();

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});