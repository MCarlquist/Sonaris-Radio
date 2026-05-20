import { useState } from "react";
import { loadConfig } from "../state/config";
import { ApiScreen } from "./ApiScreen";

export function Root() {
    const [ ready, setReady ] = useState(false);
    const config = loadConfig();

    if (!config.jamendoApiKey && !ready) {
        return (
            <box alignItems="center" justifyContent="center" flexGrow={1}>
                <ApiScreen onComplete={() => setReady(true)} />
            </box>
        );
    }

    return (
        <box alignItems="center" justifyContent="center" flexGrow={1}>
            <text content="hi" />
        </box>
    );
}

