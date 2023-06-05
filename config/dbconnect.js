const mongoose = require("mongoose")

const dbConnection = async()=>{
try {
    const connect =  await mongoose.connect(process.env.DB_CONNECTION_STRING)

    console.log("Db Connected: ", connect.connection.host, connect.connection.name);
} catch (err) {
    console.log(err);
    process.exit(1)
}
}
module.exports=dbConnection;