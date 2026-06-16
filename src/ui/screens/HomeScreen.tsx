import { useState } from "react";
import { useKeyboard } from "@opentui/react";
import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";

import { SIDEBAR_ITEMS, type NavigationItem } from "../navigation";

export function HomeScreen() {
  const [selected, setSelected] =
    useState<NavigationItem>("Search");

    const handleKeyDown = useKeyboard((event: any) => {
      const key = String(event?.name || event?.key || '').toLowerCase();
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

      if (key === 'enter' || key === 'return') {
        // Keep current selection (could add action on Enter later)
        return;
      }
    });

  return (
    <box flexDirection="row">
      <Sidebar
        selected={selected}
        onSelect={setSelected}
      />

      <box
        flexGrow={1}
        borderStyle="single"
        padding={1}
      >
        <MainContent
          selected={selected}
        />
      </box>
    </box>
  );
}