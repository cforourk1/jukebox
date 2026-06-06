import express from "express";
const router = express.Router();
export default router;

import { createTrack } from "#db/queries/tracks";
import { createPlaylist } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";



router.get("/", async (req, res) => {
  const tracksRouter = await getTracks();
  res.send(tracks);
});

router.param("id", async (req, res, next, id) => {
  const track = await getTrackById(id);
  if (!track) return res.status(404).send("Track not found.");

  req.track = track;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.track);
});