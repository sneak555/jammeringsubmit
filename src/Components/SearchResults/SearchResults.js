import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

//this module is self-explainatory as it handles everything to do with the searchResults that we get from Spotify
//this means allowing sending off the request to add the song from said results to the tracklist/playlist.js

export class SearchResults extends React.Component {
  render(){
    return (
      <div className="SearchResults">
        <h2>Results</h2>
        <TrackList tracks={this.props.result} onAdd={this.props.onAdd} isRemoval={this.props.isRemoval} />
      </div>
    )
  }
}

export default SearchResults;
