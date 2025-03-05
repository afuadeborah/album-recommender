// get all hip-hop albums from MusicBrainz

export const getArtistInfo = async (artistName) => {
    try {
        // make this dynamic after
        // const API_URL = `https://musicbrainz.org/ws/2/artist/?query=artist:beyonce&fmt=json`;
        const API_URL = `https://musicbrainz.org/ws/2/artist/?query=artist:${artistName}&fmt=json`;

        const response = await fetch(API_URL);
        const artist = response.data.artists[0];
        console.log(artist);

        return artist ? {name: artist.name, artistId: artist.id, } : null;
    } catch (error) {
        console.error('Error fetching albums', error);
    }
}