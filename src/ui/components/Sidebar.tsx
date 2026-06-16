import { type NavigationItem } from "../navigation";

type SidebarProps = {
    selected: NavigationItem;
    onSelect: (item: NavigationItem) => void;
}

const items: NavigationItem[] = [
    'search',
    'artists',
    'albums',
    'playlists'
];

export function Sidebar({ selected, onSelect}: SidebarProps) {
    return (
        <box width={24} borderStyle={'single'} flexDirection="column">
            <text>SONARIS</text>
            <text>---------------</text>
            {items.map((item) => (
                <text key={item} onClick={() => onSelect(item)}>
                    {item.toUpperCase()} {selected === item ? '>' : ''}
                </text>
            ))}
        </box>
    )
}