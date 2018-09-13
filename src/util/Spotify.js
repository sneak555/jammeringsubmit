const clientId = 'bf09f0f8598d40a49156efdc8c7eb393';
const redirectUri = 'http://localhost:3000/';
let accessToken;

//this module is self-explainatory as it handles everything to do with dealing with and interacting with spotify
//this means being able to get a accessToken by requesting permission from the users
//as well as sending the search request and taking the results and sending them to the other modules
//and finnally allowing the user to save their playlist along with the name of it.

const Spotify = {
  getAccessToken() {
    if (accessToken) { //this is for when we happen to already have the token
      return accessToken;
    }

    const accessTokenArray = window.location.href.match(/access_token=([^&]*)/); //get the array which holds the accessToken
    const expireArray = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenArray&&expireArray) {
      accessToken = accessTokenArray[1];//this is a non-symmetric array...and in this case we need a very long string that gets searched in by the match
      const expire = Number(expireArray[1]); //we want the SECOND element in this array
      window.setTimeout(() => accessToken = '', expire * 1000); //wiping the data after the set time
      window.history.pushState('Access Token', null, '/');
      return accessToken; //saving the accesstken
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
      window.location.href = accessUrl; //this is for when we don't already have the token
    }
  },

  savePlaylist(playlistName,trackArray){
    if(!(playlistName&&trackArray)){
      return; //this breaks if theres no tracks or playlist name to save with (although there pretty much always be a playlistName)
    }

    accessToken = Spotify.getAccessToken(); //getting ready to send authorization request/
    const headers = { Authorization: `Bearer ${accessToken}`};
    let userId;

    return fetch('https://api.spotify.com/v1/me', {headers: headers}
    ).then(response => response.json()
    ).then(jsonResponse => { //this gets the userId
      userId = jsonResponse.id;
      return fetch('https://api.spotify.com/v1/users/'+userId+'/playlists/', {
        headers: headers,
        method: 'POST', // this uses the userId to send the playlistId
        body: JSON.stringify({name: playlistName})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;
        return fetch('https://api.spotify.com/v1/users/'+userId+'/playlists/'+playlistId+'/tracks', {
          headers: headers,
          method: 'POST', //this uses the playlistId and userId to send the finnally send the trackArray
          body: JSON.stringify({uris: trackArray})
        });
      });
    });
  },

  search(term){
     accessToken =  Spotify.getAccessToken();
     return fetch("https://api.spotify.com/v1/search?type=track&q=" + term, {
         headers: { Authorization: `Bearer ${accessToken}` }
     }).then(response => { //this gets the response and converts it to json (something our side can understand better)
         return response.json();
     }).then(jsonResponse => {
         if (!jsonResponse.tracks) {
             return [];
         }
         return jsonResponse.tracks.items.map(track => {
             return { //this is getting the full set of data for each song.
                 id: track.id,
                 name: track.name,
                 artist: track.artists[0].name,
                 album: track.album.name,
                 uri: track.uri
             }
         });
     });
 },
}
export default Spotify;
