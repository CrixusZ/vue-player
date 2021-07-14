import { get } from "./base";

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs);
  }
  return get("/api/getSongsUrl", {
    mid: songs.map((song) => {
      return song.mid;
    }),
  }).then((result) => {
    const map = result.map;
    return songs
      .map((song) => {
        // console.log(song);
        // console.log(map);
        song.url = map[song.mid];
        return song;
      })
      .filter((song) => {
        return song.url && song.url.indexOf("vkey") > -1;
      });
  });
}
