import { createCliRenderer } from "@opentui/core";
import { createRoot } from "@opentui/react";
import { Root } from "./ui/Root";

const renderer = await createCliRenderer();
createRoot(renderer).render(<Root />);
