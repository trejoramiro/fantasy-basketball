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
    this.setState({ type: e.target.value });
  }

  render() {
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
                <input type="text" className="form-control" value={this.state.text} onChange={this.handleTextChange} placeholder="Search"></input>
              </div>
                <button type="button" className="btn btn-default" onClick={this.searchQuery.bind(this, this.state.text, this.state.type)}>Submit</button>
            </form>
          </div>
          </div>
        </div>
      );
  }
}

export default SearchBar;
