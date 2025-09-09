import express from 'express';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes.js';
import { initSocket } from './socket.js';
import { env } from 'process';
import cors from "cors";

const app = express();
const server = createServer(app);
const PORT = env.PORT;

// ✅ فعال کردن CORS برای همه یا دامنه‌های خاص
app.use(
  cors({
    origin: "*", // در حالت تست همه رو قبول می‌کنه
    // origin: ["http://localhost:3000", "http://10.0.2.2:3000", "https://myapp.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware
app.use(bodyParser.json());

// REST API
app.use('/auth', authRoutes);

// Socket.io
initSocket(server);

// Start server
server.listen(PORT, () => {
  console.log(`🚀 REST API running at http://localhost:${PORT}`);
  console.log(`💬 Socket.io running at ws://localhost:${PORT}`);
});
