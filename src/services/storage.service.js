import ImageKit from "@imagekit/nodejs";

const ImageKitClient = new ImageKit({
    privateKey: process.env.ImageKit_Private_Key
})

const uploadFile = async(file) =>{
    const result = await ImageKitClient.files.upload({
        file,
        fileName: "music_" + Date.now(),
        folder: "spotify_backend"
    })
    
    console.log("Full Response:", result);
    console.log("URL:", result.url);
    
    return {
        uri: result.url
    }
}

export default uploadFile;