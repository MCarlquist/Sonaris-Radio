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
        if (validating.state) return;
        setValidating({ state: true, message: "Validating API key..." });
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
        }, 1000);
    }, [key, onComplete]);


    return (
        <box flexDirection="column" padding={1} justifyContent="center" alignItems="center" gap={2}>
            <ascii-font font="block" text="Sonaris Radio" />
            <box justifyContent="center" alignItems="center">
                <text content="Welcome to Sonaris Radio!" paddingBottom={1} />
                <text content="To get started, please enter your Jamendo API key." paddingBottom={1} />
                <text content="You can obtain an API key for free by registering an app on the Jamendo Developer Portal." paddingBottom={1} />
                <text content="Don't have one? Visit https://developer.jamendo.com/ to create an account and get your API key." paddingBottom={1} />
            </box>
            <box borderColor={'white'} padding={2}>
                <text content="Enter your Jamendo API key:" paddingBottom={1} />
                <input onInput={setKey} onSubmit={submit} placeholder="Key..." backgroundColor={'#D6CAC7'} textColor={'black'} />
                <text {...({ onClick: submit } as any)} marginTop={2}>{validating.state ? validating.message : "Save API Key"}</text>
                {status ? <text content={status} alignItems="center" justifyContent="center" /> : null}
            </box>
        </box>
    );
}