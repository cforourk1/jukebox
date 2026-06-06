import express from "express";
import morgan from "morgan";
import playlistsRouter from "#api/playlists";
import tracksRouter from "#api/tracks";

const app = express();
export default app;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan is logging middleware!
app.use(morgan("dev"));

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);

// Handles PostgreSQL errors
app.use((err, req, res, next) => {
  // Foreign key violation
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }
// invalid syntax
if (err.code === "22P02") {
  return res.status(400).send(err.message);
}



  next(err);
});


/* catch all error handler that sends a message if none of the other error handlers can give a specific message
*/
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
