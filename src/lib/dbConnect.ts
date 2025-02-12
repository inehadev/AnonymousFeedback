import mongoose from "mongoose";

type ConnectionObject ={
    isConnected?:number
}

const connection : ConnectionObject={}

async function  dbConnect() : Promise<void>{
    if(connection.isConnected){
        console.log("Already Database is Connected");
        return
    }
    
    try {
        const db = await mongoose.connect(process.env.MONGO_URI || '' , {})
        connection.isConnected=db.connections[0].readyState
        console.log("Database is Connected Succefully");
        
    } catch (error) {
        console.log("DataBase is not Connected "  , error);
        process.exit(1);
        
    }

}

export default dbConnect;
