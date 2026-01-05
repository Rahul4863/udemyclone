const express = require('express');
const app = express();
const db = require('./config/db_Setting');
const port = process.env.PORT || 3000;
const AuthRouter = require('./routes/userRoute');
const AdminRouter = require('./routes/adminRoute');
app.use(express.json());


app.use('/api/auth', AuthRouter);
app.use('/api/admin', AdminRouter);
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});