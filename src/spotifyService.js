
import { CLIENT_ID, CLIENT_SECRET } from './spotifyConfig';

export const getSpotifyAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
};


export const searchSpotifyTracks = async (query) => {
    const accessToken = await getSpotifyAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${query}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  
    const data = await response.json();
    return data.tracks.items;
  };
  