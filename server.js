const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dbConnection = require("./config/dbconnect");
const dotenv = require("dotenv").config()

const app =  express()
const PORT = process.env.PORT ||5003;

dbConnection()
app.use(express.json())

app.use("/api/auth", require("./routes/userRoute"))
app.use("/api/product", require("./routes/productRoute"))
app.use("/api/orders", require("./routes/orderRoutes"))

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`Server is listening on http://localhost:${PORT}`);
})