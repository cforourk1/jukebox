import { faker } from "@faker-js/faker";
import db from "#db/client";
import { createTrack } from "#db/queries/tracks";
import { createPlaylistTrack } from "#db/queries/playlists_tracks";
import { createPlaylist } from "#db/queries/playlists";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  for (let i = 0; i < 20; i++) {
    await createTrack(
      faker.music.songName(),
      faker.number.int({ min: 120000, max: 360000 })
    );
  }

  for (let i = 0; i < 10; i++) {
    await createPlaylist(
      faker.word.words(3),
      faker.lorem.sentence()
    );
  }

  for (let i = 0; i < 15; i++) {
    const trackId = 1 + Math.floor(Math.random() * 20);
    const playlistId = 1 + Math.floor(Math.random() * 10);
    await createPlaylistTrack(playlistId, trackId);
  }
}