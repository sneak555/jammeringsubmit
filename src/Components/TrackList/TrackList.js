import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

//this module is self-explainatory as it handles everything to do with the tracklist (IE: the trackArray)
//this means it helps seperate the tracks from the sum total that is the track array

class TrackList extends React.Component {
  render(){
    return (
      <div className="TrackList">
        {this.props.tracks.map(track => { //this takes the trackArray and maps each element of it to a seperate Track.js instance
          return (<Track track={track} onAdd={this.props.onAdd} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} />)
        })}
      </div>
    );
  }
}

export default TrackList;
