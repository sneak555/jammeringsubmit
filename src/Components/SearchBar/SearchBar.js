import React from 'react';
import './SearchBar.css';

//this module is self-explainatory as it handles everything to do with the searchbar
//this means being able to search for stuff and sending the results to searchresults.js

export class SearchBar extends React.Component {
  constructor(props){
    super(props);
    this.search = this.search.bind(this);
    this.handleTermChange = this.handleTermChange.bind(this);
    this.state = {
      SearchBar: "",
    };
  }
  handleTermChange(event){ //this is similar to the playlistName handlenamechange
    this.setState({SearchBar:event.target.value})
  }
  search(){//this sends a request to spotify through app.js then spotify.js
    this.props.onSearch(this.state.SearchBar);
  }
  render(){
    return (
      <div className="SearchBar">
        <input onChange={this.handleTermChange} onSearch={this.search} placeholder="Enter A Song, Album, or Artist" />
        <a onClick={ this.search }>SEARCH</a>
      </div>
    )
  }
}

export default SearchBar;
