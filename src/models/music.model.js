import mongoose from "mongoose";


const musicSchema = mongoose.Schema({
uri:{
type:String,
required:true,
unique:true
},
title:{
type:String,
required:true
},
artist:{
type:mongoose.Schema.Types.ObjectId,
ref:"user",
required:true


}
})


const musicModel = mongoose.model("musics", musicSchema);


export default musicModel;