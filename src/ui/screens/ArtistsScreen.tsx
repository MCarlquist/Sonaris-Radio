import { loadConfig } from "../../state/config";
import { fetchDefaultArtists } from "../../api/jamendo";
import { useEffect, useState } from "react";
import { useKeyboard } from "@opentui/react";

type Props = {
    focused?: boolean;
    onArtistActivate?: (artistName: string) => void;
}

export function ArtistsScreen({ focused = false, onArtistActivate }: Props) {
    const config = loadConfig();
    const { jamendoApiKey } = config;
    const [artists, setArtists] = useState<{ id: string; name: string }[]>([]);
    const [focusedIndex, setFocusedIndex] = useState(0);

    useEffect(() => {
        async function loadArtists() {
            if (!jamendoApiKey) return;
            const artists = await fetchDefaultArtists(jamendoApiKey);
            if (artists.length > 0) {
                setArtists(artists);
                setFocusedIndex(0);
            }
        }

        loadArtists();
    }, [jamendoApiKey]);

    useKeyboard((event: any) => {
        if (!focused) return;
        const key = String(event?.name || event?.key || '').toLowerCase();
        if (key.includes('up')) {
            setFocusedIndex((i) => (i - 1 + artists.length) % artists.length);
            return;
        }
        if (key.includes('down')) {
            setFocusedIndex((i) => (i + 1) % artists.length);
            return;
        }
        if (key === 'enter' || key === 'return') {
            const artist = artists[focusedIndex];
            if (artist) onArtistActivate?.(artist.id);
            return;
        }
    });

    return (
        <box flexDirection="column">
            <ascii-font text="Artists" font={'tiny'} />
            <text>Today's Top Artists</text>
            <text>-----</text>
            {artists.map((a, idx) => (
                <text key={a.id} {...({ paddingX: 1, paddingY: 0, backgroundColor: focused && idx === focusedIndex ? '#444' : undefined } as any)}>
                    {focused && idx === focusedIndex ? '>' : ' '} {a.name}
                </text>
            ))}
        </box>
    )
}