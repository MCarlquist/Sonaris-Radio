import { type NavigationItem } from "../navigation";
import { SearchScreen } from "../screens/SearchScreen";
import { ArtistsScreen } from "../screens/ArtistsScreen";
import { PlaylistsScreen } from "../screens/PlaylistsScreen";
import { AlbumsScreen } from "../screens/AlbumsScreen";

type Props = {
    selected: NavigationItem;
}

export function MainContent({ selected}: Props) {
    switch (selected) {
        case 'Artists':
            return <ArtistsScreen />
        case 'Search':
            return <SearchScreen />
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