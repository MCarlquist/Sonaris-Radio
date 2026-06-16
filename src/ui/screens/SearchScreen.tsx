
import { useEffect, useState } from "react";
import { fetchArtistTracks } from "../../api/jamendo";
import { loadConfig } from "../../state/config";


type Props = {
  query?: string | undefined;
}

export function SearchScreen({ query }: Props) {
    const config = loadConfig();
    const { jamendoApiKey } = config;
  const [tracks, setTracks] = useState<{ id: string, name: string, streamUrl: string, artist: string }[]>([]);

  useEffect(() => {
    async function loadTracks() {
      if (!query) return;
      const tracks = await fetchArtistTracks(jamendoApiKey!, query);
      setTracks(tracks);
    }

    loadTracks();
  }, [query]);

  return (
    <box flexDirection="column">
      <ascii-font text="Search" font={'tiny'} />
      <text>
        Search tracks, albums and artists
      </text>
      <text>{tracks.length} tracks found</text>
      {tracks.map((t) => (
        <text key={t.id}>{t.artist} - {t.name}</text>
      ))}
    </box>
  );
}