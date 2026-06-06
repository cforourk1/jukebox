import db from "#db/client";

// create a track function - inserts name and duration
export async function createTrack(name, duration) {
  const sql = `
  INSERT INTO tracks
    (name, duration_ms)
  VALUES
    ($1, $2)
  RETURNING *
  `;
  const {
    rows: [track],
  } = await db.query(sql, [name, duration]);
  return track;
}