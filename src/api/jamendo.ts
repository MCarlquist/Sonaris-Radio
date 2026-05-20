export async function validateJamendoApiKey(apiKey: string): Promise<boolean> {
    const apiUrl = `https://api.jamendo.com/v3.0/tracks?client_id=${apiKey}&limit=1&format=json`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            return false;
        }
        const data: any = await response.json();
        
        // Check headers.status - must be "ok" for valid API key
        // Invalid keys return headers.status = "failed" with code 5
        // Suspended apps return headers.status = "failed" with code 11
        const isValid = data.headers?.status === "success";
        return isValid;
    } catch (error) {
        return false;
    }
}
