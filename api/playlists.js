import express from "express";
import { createPlaylist, getPlaylists, getPlaylistById } from "#db/queries/playlists";
import { getTracksByPlaylistId } from "#db/queries/playlists";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";

const router = express.Router();
export default router;

// router looking for data first before returning
router.get("/", async (req, res) => {
  const playlists = await getPlaylists();
  res.send(playlists);
});

/* router param is a special express feature that goes and tries to find the playlist from the request. If it is found it will pass it to the next router step. If it is not found it will throw an error. This helps simplify things in terms of time spent on requests
*/
router.param("id", async (req, res, next, id) => {
  const playlist = await getPlaylistById(id);
  if (!playlist) return res.status(404).send("Playlist not found.");
  req.playlist = playlist;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.playlist);
});

router.post("/", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send("Request body needs: name, description");
  }
  const playlist = await createPlaylist(name, description);
  res.status(201).send(playlist);
});

// get all tracks in a playlist
router.get("/:id/tracks", async (req, res) => {
  const tracks = await getTracksByPlaylistId(req.playlist.id);
  res.send(tracks);
});

// add a track to a playlist
router.post("/:id/tracks", async (req, res) => {
  if (!req.body) return res.status(400).send("Request body required.");
  const { trackId } = req.body;
  if (!trackId) return res.status(400).send("trackId is required.");
  const playlistTrack = await createPlaylistTrack(req.playlist.id, trackId);
  res.status(201).send(playlistTrack);
});