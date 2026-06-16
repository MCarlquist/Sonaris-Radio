import { type NavigationItem } from "../navigation";
import { SearchScreen } from "../screens/SearchScreen";
import { ArtistsScreen } from "../screens/ArtistsScreen";
import { PlaylistsScreen } from "../screens/PlaylistsScreen";
import { AlbumsScreen } from "../screens/AlbumsScreen";

type Props = {
    selected: NavigationItem;
    focused?: boolean;
    onArtistActivate?: (artistName: string) => void;
    searchQuery?: string | undefined;
}

export function MainContent({ selected, focused = false, onArtistActivate, searchQuery }: Props) {
    switch (selected) {
        case 'Artists':
            return <ArtistsScreen focused={focused} onArtistActivate={onArtistActivate} />
        case 'Search':
            return <SearchScreen query={searchQuery} />
        case 'Albums':
            return <AlbumsScreen />
        case 'Playlists':
            return <PlaylistsScreen />
        default:
            return (
                <text>Screen not implemented</text>
            )
    }
}