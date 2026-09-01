import musicModel from "../models/music.model.js"
import albumModel from "../models/album.model.js"
import uploadFile from "../services/storage.service.js";


const musicCreate = async (req, res) => {

  const { title, album } = req.body;

  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"));

  const music = await musicModel.create({

    uri: result.uri,

    title,

    artist: req.user.id,

    album

  });

  res.status(201).json({

    message: "Music Created Successfully",

    music: {

      id: music._id,

      uri: music.uri,

      title: music.title,

      artist: music.artist

    }

  });

};

const albumCreate = async (req, res) => {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    artist: req.user.id,
    musics: musics
  });

  res.status(201).json({
    message: "Album Created Successfully",
    album: {
      id: album._id,
      title: album.title,
      artist: album.artist,
      musics: album.musics
    }
  });
};

const getAllMusics = async(req, res) =>{
const musics = 
await musicModel.find()
.skip(0)
.limit(10)
.populate("artist", "username email")

res.status(200).json({
message:"All Musics Fetched Successfully",
musics:musics


})



}

const getAllalbums = async(req, res) =>{

const allAlbums = await albumModel.find().select("title artist").populate("artist", "username email")

res.status(200).json({
  message:"Albums Fetched Successfully",
  allAlbums:allAlbums
})

} 

const getAlbumById = async(req,res)=>{

const albumId = req.params.albumId

const album = await albumModel.findById(albumId)
.populate("artist", "username email")
.populate("musics")

return res.status(200).json({

message:"All Albums Fetched Successfully",

album:album

})

}


export default { musicCreate, albumCreate, getAllMusics,getAllalbums,getAlbumById};