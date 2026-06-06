import db from "#db/client";

//create a playlist

export async function createPlaylist(name, description) {
  const sql = `
  INSERT INTO playlists
    (name, description)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [name, description]);
  return playlist;
}

// return all playlists 

export async function getPlaylists() {
  const sql = `
  SELECT *
  FROM playlists
  `;
  const { rows: playlists } = await db.query(sql);
  return playlists;
}


// get a playlist by ID

export async function getPlaylistById(id) {
  const sql = `
  SELECT *
  FROM playlists
  WHERE id = $1
  `;
  const {
    rows: [playlist],
  } = await db.query(sql, [id]);
  return playlist;
}

/* selecting distinct tracks.*  no duplicate rows. tracks can appear accros many playlists. this will remove duplicates. we use tracks.* to signify whic columns we want. we are getting it from the junction table playlists tracks. we are joining on the IDs of the tracks and playlists where they match and then locating the tracs based on the playlist ID and returning those tracks.
*/

export async function getTracksByPlaylistId(id) {
  const sql = `
  SELECT DISTINCT tracks.*
  FROM
    playlists_tracks
    JOIN playlists ON playlists_tracks.playlist_id = playlists.id
    JOIN tracks ON playlists_tracks.track_id = tracks.id
  WHERE
    playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}