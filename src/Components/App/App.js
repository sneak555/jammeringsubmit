import React, { Component } from 'react';
import './App.css';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';

//this is the main module of jammering...it handles all oll of the back and forth of data between the other modules
//and is the parent of everything.

class App extends React.Component {
  constructor(props){
    super(props);
    this.removeTrack = this.removeTrack.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
    this.state = {
      playlistName: "this is the playlistName string",
      playlistTracks: [],
      searchResults: [],
    };
  }

  addTrack(track){
    if(this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return; //this method trys to test if a track that is slated to be added is already present and if not....adds it
    }
    let tempList = this.state.playlistTracks.slice();
    tempList.push(track); //we use slice to make a copy and then push to add the new track..
    this.setState({ playlistTracks: tempList });
  }
  search(searchTerm){
    Spotify.search(searchTerm).then(tracks => { //this method tells the search method in spotify.js to run and sends the results to searchresults.js
      this.setState( {searchResults: tracks})
    });
  }
  removeTrack(track){ //this method uses splice and indexOF to find where the track is and removes exactly that one track
    this.state.playlistTracks.splice(this.state.playlistTracks.indexOf(track), 1);
    this.setState({ playlistTracks: this.state.playlistTracks });
  }

  updatePlaylistName(name){ //this is just used to update the playlistname
    this.setState({ playlistName: name});
  }
  savePlaylist(){
    const tempArray = this.state.playlistTracks.map(track => {
      return track.uri; //this takes the trackArray and maps it to their respective Ids
    });
    Spotify.savePlaylist(this.state.playlistName,tempArray); //send it off to spotify.js

    this.setState({ //remove the playlist to make room for a new one if needed.
      playlistName: 'New Playlist',
      playlistTracks: []
    })
  }

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults result={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
