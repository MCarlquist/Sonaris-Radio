import { useCallback, useState } from "react";
import { updateConfig } from "../state/config";
import { validateJamendoApiKey } from "../api/jamendo";

type Props = {
    onComplete: () => void;
}

export function ApiScreen({ onComplete }: Props) {
    const [key, setKey] = useState("");
    const [status, setStatus] = useState('');
    const [validating, setValidating] = useState({
        state: false,
        message: '',
    });

    const submit = useCallback(async () => {
        setValidating({ state: true, message: "Validating API key..." });
        setStatus("Validating API key...");
        const valid = await validateJamendoApiKey(key);
        
        if (!valid) {
            setStatus("Invalid API key. Please try again.");
            setValidating({ state: false, message: '' });
            return;
        }

        updateConfig({ jamendoApiKey: key });

        setStatus("API key saved! You can now use the app.");
        setTimeout(() => {
            onComplete();
        }, 500);
    }, [key, onComplete]);


    return (
        <box flexDirection="column" padding={1} justifyContent="center" alignItems="center" gap={2}>
            <ascii-font font="block" text="Sonaris Radio" />
            <text content="Enter your Jamendo API key:" />
            <input onInput={setKey} onSubmit={submit} placeholder="Key..."/>
            <text onClick={submit}>{validating.state ? validating.message : "Save API Key"}</text>
            {status ? <text content={status} /> : null}
        </box>
    );
}