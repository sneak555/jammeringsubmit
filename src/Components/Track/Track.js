import React from 'react';
import './Track.css';

//this module is self-explainatory as it handles everything to do with the tracks themselves
//this means its a child of tracklist.js and allows the user to add/remove tracks through
//a renderaction method

class Track extends React.Component
{
  constructor(props)
  {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack  = this.removeTrack.bind(this);
    this.renderAction = this.renderAction.bind(this);
  }
  addTrack(){
    this.props.onAdd(this.props.track);
  }
  removeTrack(){ //this method and the one above are self explainatory
    this.props.onRemove(this.props.track);
  }
  renderAction(){
    if(this.props.isRemoval) {
      return (<a className="Track-action" onClick={this.removeTrack}>-</a>);// anchor tags in there
      //this is supposed to remove a track that IS currently in the playlist, it should be a button
      //that shows up as a "-" sign by the tracks that you have in your playlist
      //this is similar to the problem below, it is for step 55
    } else {
      return (<a className="Track-action" onClick={this.addTrack}>+</a>);
      //this is supposed to add a track that is NOT currently in the playlist it should be a button
      //that shows up as a "+" signby the tracks that you find in your search.
      // step 47 onclick property for the + element//
    }
  }

  render(){
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.name}</h3>
          <p>{this.props.track.artist} | {this.props.track.album}</p> {/*these are not getting left-justifyed for some reason
          the video shows them as such...but a tutor said that this doesnt matter so I'm ignoring that */}
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
