import { type NavigationItem } from "../navigation";


type SidebarProps = {
    selected: NavigationItem;
    onSelect: (item: NavigationItem) => void;
    focused?: boolean;
}

const items: NavigationItem[] = [
    'Search',
    'Artists',
    'Albums',
    'Playlists'
];

export function Sidebar({ selected, onSelect, focused = false }: SidebarProps) {
    return (
        <box width={24} borderStyle={'single'} flexDirection="column" borderColor={focused ? 'cyan' : undefined} padding={1}>
            <text>SONARIS</text>
            <text>---------------</text>
            {items.map((item) => (
                <text key={item} {...({ onClick: () => onSelect(item), paddingY: 0, paddingX: 1, backgroundColor: focused && selected === item ? '#444' : undefined } as any)}>
                    {selected === item ? '>' : ' '} {item}
                </text>
            ))}
        </box>
    )
}