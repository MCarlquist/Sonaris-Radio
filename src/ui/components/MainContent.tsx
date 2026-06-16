import { type NavigationItem } from "../navigation";
import { SearchScreen } from "../screens/SearchScreen";
import { ArtistsScreen } from "../screens/ArtistsScreen";
import { PlaylistsScreen } from "../screens/PlaylistsScreen";

type Props = {
    selected: NavigationItem;
}

export function MainContent({ selected}: Props) {
    switch (selected) {
        case 'artists':
            return <ArtistsScreen />
        case 'search':
            return <SearchScreen />
        case 'playlists':
            return <PlaylistsScreen />
        default:
            return (
                <text>Screen not implemented</text>
            )
    }
}