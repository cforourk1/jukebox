import express from "express";
import { getTracks, getTrackById } from "#db/queries/tracks";

const router = express.Router();
export default router;

// router looking for data first before returning

router.get("/", async (req, res) => {
  const tracks = await getTracks();
  res.send(tracks);
});
/* router param is a special express feature that goes and tries to find the track from the request. If it is found it will pass it to the next router step. If it is not found it will throw an error. This helps simplify things in terms of time spent on requests
*/
router.param("id", async (req, res, next, id) => {
  const track = await getTrackById(id);
  if (!track) return res.status(404).send("Track not found.");

  req.track = track;
  next();
});

router.get("/:id", (req, res) => {
  res.send(req.track);
});