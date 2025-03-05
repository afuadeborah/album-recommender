import dotenv from "dotenv";
import express from 'express';
import './database.js';
import authRouter from "./backend/routes/auth.js";
import noteRouter from "./backend/routes/note.js";

const app = express();
app.use('/api/auth', authRouter);
app.use('/api/notes', noteRouter);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});