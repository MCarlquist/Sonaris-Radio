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

// fetch the default arttists from jamendo and return them as an array of objects with id and name
export async function fetchDefaultArtists(apiKey: string): Promise<{ id: string, name: string }[]> {
    const apiUrl = `https://api.jamendo.com/v3.0/artists?client_id=${apiKey}&limit=15&format=json`;
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error("Failed to fetch artists");
        }
        const data: any = await response.json();
        
        return data.results.map((artist: any) => ({
            id: artist.id,
            name: artist.name,
        }));
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
}

// fetch the indivual artist tracks from jamendo and return them as an array of objects with id and name and streaming url
export async function fetchArtistTracks(apiKey: string, artistId: string): Promise<{ id: string, name: string, streamUrl: string, artist: string }[]> {
    const apiUrl = `https://api.jamendo.com/v3.0/tracks?client_id=${apiKey}&artist_id=${artistId}&limit=15&format=json`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error("Failed to fetch artist tracks");
        }
        const data: any = await response.json();

        return data.results.map((track: any) => ({
            id: String(track.id ?? track.track_id ?? ''),
            name: track.name ?? '',
            streamUrl: track.audio ?? track.stream ?? '',
            artist: track.artist_name ?? track.artist ?? ''
        }));
    } catch (error) {
        console.error("Error fetching artist tracks:", error);
        return [];
    }
}
