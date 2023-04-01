const express = require('express');
const cors=require('cors');

const { connection } = require('./config/db');
const { userRouter } = require('./routes/user.route');

const app = express();

// middlewares
app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
    try {
        res.send("Ok")
    } catch (error) {
        console.log('error: ', error);
    }
})

app.use('/user',userRouter);

//error hadnling middleware
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
}) 

app.listen(8080, async () => {
    try {
        await connection;
        console.log("Server running on 8080 port")
    } catch (error) {
        console.log("Server is not running")
    }
})