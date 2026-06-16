import { useState } from "react";

import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";

import { type NavigationItem } from "../navigation";

export function HomeScreen() {
  const [selected, setSelected] =
    useState<NavigationItem>("search");

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