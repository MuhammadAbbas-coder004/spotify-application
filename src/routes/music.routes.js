import express from "express";
import musicController from "../controller/music.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = express.Router();


const upload = multer({storage:multer.memoryStorage()})

router.post("/upload", authMiddleware.authArtist ,upload.single("music"),  musicController.musicCreate);
router.post("/album", authMiddleware.authArtist, musicController.albumCreate)
router.get("/", authMiddleware.authUser ,musicController.getAllMusics)
router.get("/albums", authMiddleware.authUser ,musicController.getAllalbums)
router.get("/albums/:albumId", authMiddleware.authUser, musicController.getAlbumById)


export default router
