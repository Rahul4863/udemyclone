const express = require('express');
const app = express();
const db = require('./config/db_Setting');
const port = process.env.PORT || 3000;
const AuthRouter = require('./routes/userRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const AdminRouter = require('./routes/adminRoute');
const viewRouter = require('./routes/viewRoute');
const CourseRouter = require('./routes/courseRoute');
const path = require('path');

app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: [
            "http://localhost:5173",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/auth', AuthRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/view', viewRouter);
app.use('/api/course', CourseRouter);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});