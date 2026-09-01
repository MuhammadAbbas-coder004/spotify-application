import mongoose from "mongoose";


const connectDB = async() => {
try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("<'-'> DB Is Connected Successfully <'-'>");
    
}catch(err){
console.log(`${err}|XXX| DB Connection Is Failed |XXX|`);
process.exit(0)

}
}


export default connectDB;