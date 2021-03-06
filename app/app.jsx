import React from 'react';
import SearchBar from './searchbar.jsx';
import SearchResults from './searchresults.jsx';
import Team from "./team.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "total": 0,
      "players": [],
      "team": [ { id: 1, firstname: "Lebron", lastname: "James", pts: 30, ast: 15, reb: 6, position: "Power Forward", img_url: "http://stats.nba.com/media/players/230x185/2544.png"},{id: 2, firstname: "Russell", lastname: "Westbrook", pts: 31, ast: 14, reb: 10, position: "Point Guard", img_url: "http://stats.nba.com/media/players/230x185/201566.png"},{id: 3, firstname: "Kevin", lastname: "Durant", pts: 27, ast: 12, reb: 8, position: "Gaurd", img_url: "http://stats.nba.com/media/players/230x185/201142.png" } ],
      "links": [ { prev: '#', next: '#' } ],
    };

    this.removeTeamMember = this.removeTeamMember.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.performOtherSearch = this.performOtherSearch.bind(this);
  }

  componentDidMount() {
    let sum = this.state.team.reduce((total, item) => {
      return total + item.pts;
    }, 0);
    this.setState({ total: sum });
  }

  performSearch(item) {
    var url = 'search?type=' + item.type + '&text=' + item.text + '&offset=0'
    var _this = this;
    fetch(url).then(function(response){
      return response.json();
    }).then(function(d){
      _this.setState({ players: d[0].data, links: { prev: d[0].link.prev , next: d[0].link.next } });
    });
  }


  performOtherSearch(url) {
    var _this = this;
    fetch(url).then(function(response){
      return response.json();
    }).then(function(d){
      _this.setState({ players: d[0].data, links: { prev: d[0].link.prev , next: d[0].link.next } });
    });
  }


  removeTeamMember(index) {
    let teamMembers = this.state.team.filter(function(item) {
      return item.id !== index;
    });
    let sum = teamMembers.reduce((total, item) => {
      return total + item.pts;
    }, 0);
    this.setState({ team: teamMembers, total: sum });
  }


  addTeamMember(newTeamMember) {
	  if(this.state.team.length < 5) {
    let newTeam = this.state.team.concat([newTeamMember]);
    let sum = newTeam.reduce((total, item) => {
      return total + item.pts;
    }, 0);
    this.setState({ team: newTeam, total: sum });
	  }
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
            <SearchBar performSearch={this.performSearch.bind(this)} />
            <SearchResults links={this.state.links} players={this.state.players} addTeamMember={this.addTeamMember.bind(this)} performOtherSearch={this.performOtherSearch.bind(this)}/>
            <h1>{this.state.total}</h1>
            <Team team={this.state.team} removeTeamMember={this.removeTeamMember.bind(this)}/>
      </div> )
    }
}

export default App;
