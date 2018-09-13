import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

//this module is self-explainatory as it handles everything to do with the playlist
//this means allowing hte user to change the name and remove songs

export class Playlist extends React.Component {
  constructor(props){
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }
  handleNameChange(event){ //this runs eachtime you type something into the playlistname
    this.props.onNameChange(event.target.value);
    this.setState({playlistName: event.target.value});
  }
  render(){
    return (
      <div className="Playlist">
        <input onChange={this.handleNameChange} defaultValue={ 'New Playlist' }/>
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={!this.props.isRemoval} />
        <a onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    )
  }
}

export default Playlist;
