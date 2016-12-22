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
      "team": [ { id: 1, firstname: "Lebron", lastname: "James", pts: 30, ast: 15, reb: 6, position: "Power Forward" },{id: 2, firstname: "Russell", lastname: "Westbrook", pts: 31, ast: 14, reb: 10, position: "Point Guard"},{id: 3, firstname: "Kevin", lastname: "Durant", pts: 27, ast: 12, reb: 8, position: "Gaurd" } ],
      "links": [ { prev: '#', next: '#' } ],
    };

    this.removeTeamMember = this.removeTeamMember.bind(this);
    this.addTeamMember = this.addTeamMember.bind(this);
    this.performSearch = this.performSearch.bind(this);
    this.performOtherSearch = this.performOtherSearch.bind(this);
  }


  performSearch(item) {
    var url = 'search?type=' + item.type + '&text=' + item.text + '&offset=0'
    var _this = this;
    fetch(url).then(function(response){
      return response.json();
    }).then(function(d){
      console.log(d);
      _this.setState({ players: d[0].data, links: { prev: d[0].link.prev , next: d[0].link.next } });
    });
  }


  performOtherSearch(url) {
    var _this = this;
    fetch(url).then(function(response){
      return response.json();
    }).then(function(d){
      console.log(d);
      _this.setState({ players: d[0].data, links: { prev: d[0].link.prev , next: d[0].link.next } });
    });
  }


  updateTotal() {
    var newTotal = this.state.team.reduce(function(total, item){
      return total + item.pts;
    }, 0)
    this.setState({ total: newTotal });
  }


  removeTeamMember(index) {
    var teamMembers = this.state.team.filter(function(item) {
      return item.id !== index;
    });
    this.setState({ team: teamMembers });
  }


  addTeamMember(newTeamMember) {
    this.setState({ team: this.state.team.concat([newTeamMember])});
    this.updateTotal();
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
