import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import path from 'path';
import routes from './server/routes/index.js';
import dbConnection from './server/configs/db.connection.js';

const app = express();
const PORT = process.env.PORT || 5000;

const corsOption = {
    origin: "http://localhost:5173"
}

app.use(cors());
app.use(express.json());

app.get('/api', (req, res) => {
    res.json("API is live")
})

app.use("/api", routes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendPath = path.join(__dirname, './client/dist');

app.use(express.static(frontendPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});


app.listen(PORT, () => {
    dbConnection();
    console.log(`Server running on port ${PORT}`);
})