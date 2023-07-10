import mongoose, {mongo} from "mongoose";



const connectdb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("Database connection:", connect.connection.host, connect.connection.name);
    } catch (error) {
        console.error(`error:${error.message}`);
        process.exit(1)
    }
}


export default connectdb