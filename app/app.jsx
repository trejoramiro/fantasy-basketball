import React from 'react';
import SearchBar from './searchbar.jsx';
import SearchResults from './searchresults.jsx';
import Team from "./team.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "teams": []
    };
  }

  render() {
    return (
      <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <a className="navbar-brand" href="#">Brand</a>
                </div>
              </div>
            </nav>
            <SearchBar />
            <SearchResults team={this.props.backend.team} />
            <Team team={this.props.backend.team}/>
      </div> )
    }
}

export default App;
