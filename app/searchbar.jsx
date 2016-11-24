import React from 'react';

class SearchBar extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <div className="row">
            <div className="col-md-8 col-md-offset-4">
            <form className="form-inline">
              <div className="form-group">
                <select className="form-control">
                  <option>Name</option>
                  <option>Position</option>
                  <option>Team</option>
                  <option>Historic</option>
                </select>
                <input type="text" className="form-control" placeholder="Search"></input>
              </div>
                <button type="submit" className="btn btn-default" onClick={this.searchQuery}>Submit</button>
            </form>
          </div>
          </div>
        </div>
      );
  }
}

export default SearchBar;
