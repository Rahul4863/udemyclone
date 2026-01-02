const express = require('express');
const app = express();
const db = require('./config/db_Setting');
const port = process.env.PORT || 3000;
const AuthRouter = require('./routes/userRoute');
app.use(express.json());
app.use('/api/auth', AuthRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});