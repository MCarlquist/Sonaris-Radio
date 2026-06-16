import { useState } from "react";
import { useKeyboard } from "@opentui/react";
import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";

import { SIDEBAR_ITEMS, type NavigationItem } from "../navigation";

export function HomeScreen() {
  const [selected, setSelected] = useState<NavigationItem>(() => 'Search');

  const [focusArea, setFocusArea] = useState<'sidebar' | 'main'>('sidebar');
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  const handleKeyDown = useKeyboard((event: any) => {
    const key = String(event?.name || event?.key || '').toLowerCase();
    const isTab = key === 'tab' || key.includes('tab');
    const shift = Boolean(event?.shift || event?.shiftKey);

    // Tab / Shift+Tab => toggle focus area
    if (isTab) {
      setFocusArea((prev) => (shift ? (prev === 'main' ? 'sidebar' : 'main') : (prev === 'sidebar' ? 'main' : 'sidebar')));
      return;
    }

    // Only handle Up/Down when sidebar is focused
    if (focusArea === 'sidebar') {
      const idx = SIDEBAR_ITEMS.indexOf(selected);
      if (key.includes('up')) {
        const next = (idx - 1 + SIDEBAR_ITEMS.length) % SIDEBAR_ITEMS.length;
        setSelected(SIDEBAR_ITEMS[next] as NavigationItem);
        return;
      }

      if (key.includes('down')) {
        const next = (idx + 1) % SIDEBAR_ITEMS.length;
        setSelected(SIDEBAR_ITEMS[next] as NavigationItem);
        return;
      }
    }

    // If focusArea === 'main', other keys can be handled here later
  });

  return (
    <box flexDirection="column" height="100%">
      <box flexDirection="row" flexGrow={1}>
        <Sidebar
          selected={selected}
          onSelect={setSelected}
          focused={focusArea === 'sidebar'}
        />

        <box
          flexGrow={1}
          borderStyle="single"
          borderColor={focusArea === 'main' ? 'cyan' : undefined}
          padding={1}
        >
          <MainContent
            selected={selected}
            focused={focusArea === 'main'}
            onArtistActivate={(artistName: string) => {
              setSearchQuery(artistName);
              setSelected('Search');
              setFocusArea('main');
            }}
            searchQuery={searchQuery}
          />
        </box>
      </box>

      <box height={3} borderStyle="single" justifyContent="center" alignItems="center">
        <text>
          Use Up/Down to change navigation. Press Tab to switch focus (Shift+Tab to reverse). Active: {focusArea.toUpperCase()}
        </text>
      </box>
    </box>
  );
}