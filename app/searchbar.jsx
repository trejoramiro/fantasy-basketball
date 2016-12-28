import React from 'react';

class SearchBar extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      text: '',
      type: 'name'
    };

    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
  }

  searchQuery(inputText, inputType) {
    var item = {
      text: inputText,
      type: inputType
    };
    this.props.performSearch(item);
  }

  handleTextChange(e) {
    this.setState({ text: e.target.value });
  }

  handleTypeChange(e) {
    let newType = e.target.value;
    if(newType == 'position') {
      this.setState({ type: newType, text: 'Center' });
    } else if(newType == 'team') {
      this.setState({ type: newType, text: 'ATL' });
    } else {
      this.setState({ type: newType, text: '' });
    }
  }

  render() {

    let input = null;
    if (this.state.type == 'position') {
      input = <select className="form-control" value={this.state.text} onChange={this.handleTextChange}>
        <option selected value="Center">Center</option>
        <option value="Center-Forward">Center-Forward</option>
        <option value="Forward">Forward</option>
        <option value="Forward-Center">Forward-Center</option>
        <option value="Forward-Guard">Forward-Guard</option>
        <option value="Guard">Guard</option>
        <option value="Guard-Forward">Guard-Forward</option>
      </select>;

    } else if (this.state.type == 'team') {
      input = <select className="form-control" value={this.state.text} onChange={this.handleTextChange}>
        <option selected value="ATL">ATL</option>
        <option value="BKN">LAL</option>
        <option value="BOS">MIA</option>
        <option value="CHA">NYC</option>
        <option value="CHI">LAL</option>
        <option value="CLE">MIA</option>
        <option value="DAL">NYC</option>
        <option value="DEN">LAL</option>
        <option value="DET">MIA</option>
        <option value="GSW">NYC</option>
        <option value="HOU">LAL</option>
        <option value="IND">MIA</option>
        <option value="LAC">NYC</option>
        <option value="LAL">LAL</option>
        <option value="MEM">MIA</option>
        <option value="MIA">NYC</option>
        <option value="MIL">LAL</option>
        <option value="MIN">MIA</option>
        <option value="NOP">NYC</option>
        <option value="NYK">LAL</option>
        <option value="OKC">MIA</option>
        <option value="ORL">NYC</option>
        <option value="PHI">LAL</option>
        <option value="PHX">MIA</option>
        <option value="POR">NYC</option>
        <option value="SAC">MIA</option>
        <option value="SAS">NYC</option>
        <option value="TOR">LAL</option>
        <option value="UTA">MIA</option>
        <option value="WAS">NYC</option>
      </select>;

    } else {
      input = <input type="text" className="form-control" value={this.state.text} onChange={this.handleTextChange} placeholder="Search"></input>;

    }

    return (
      <div>
        <div className="row">
            <div className="col-md-8 col-md-offset-4">
            <form className="form-inline">
              <div className="form-group">
                <select className="form-control" value={this.state.type} onChange={this.handleTypeChange}>
                  <option value="name">Name</option>
                  <option value="position">Position</option>
                  <option value="team">Team</option>
                  <option value="historic">Historic</option>
                </select>
                { input }
              </div>
                <button type="button" className="btn btn-default" onClick={this.searchQuery.bind(this, this.state.text, this.state.type)}>Submit</button>
            </form>
          </div>
          </div>
          <br></br>
        </div>
      );
  }
}

export default SearchBar;
