import { type NavigationItem } from "../navigation";


type SidebarProps = {
    selected: NavigationItem;
    onSelect: (item: NavigationItem) => void;
}

const items: NavigationItem[] = [
    'Search',
    'Artists',
    'Albums',
    'Playlists'
];

export function Sidebar({ selected, onSelect}: SidebarProps) {
    return (
        <box width={24} borderStyle={'single'} flexDirection="column">
            <text>SONARIS</text>
            <text>---------------</text>
            {items.map((item) => (
                <text key={item} onKeyDown={() => onSelect(item)}>
                    {selected === item ? '>' : ''} {`${item}`}
                
                </text>
            ))}
        </box>
    )
}