const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const leadRoutes = require('./routes/leadRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://74.125.24.100:27017/enterprise_crm";
connectDB();
const app = express();

app.use(helmet());
app.use(cors({ origin: '*' }));
app.use(express.json());

// Enterprise API Mountpoints
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5050;
// app.listen(PORT, () => console.log(`Production Server streaming live on internal port : ${PORT}`));


const server = app.listen(PORT, () => {
    console.log(`Production Server streaming live on internal port : ${server.address().port}`);
});

server.on('error', (e) => {
    if (e.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} busy hai, alternative port par start kar rahe hain...`);
        setTimeout(() => {
            server.close();
            server.listen(0); // 0 likhne se Windows khud ek ekdum khali port de dega
        }, 1000);
    }
});