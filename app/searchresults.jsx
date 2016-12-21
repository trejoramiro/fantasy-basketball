import React from 'react';

class SearchResults extends React.Component {

  addTeamMember(item) {
    this.props.addTeamMember(item);
  }

  performAnotherSearch(url) {
    this.props.performOtherSearch(url);
  }

  render() {
    return (
        <div>
          <div className="row">
            <div className="col-md-12">
          <table className="table table-bordered table-striped">
            <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Pts</th>
              <th>Ast</th>
              <th>Reb</th>
              <th>Action</th>
            </tr>
          </tbody>
            { this.props.players.map((x) => { return (
              <tbody key={x.id}>
              <tr>
                <td>
                  { x.firstname }
                </td>
                <td>
                  { x.lastname }
                </td>
                <td>
                  { x.position }
                </td>
                <td>
                  { x.pts }
                </td>
                <td>
                  { x.ast }
                </td>
                <td>
                  { x.reb }
                </td>
                <td>
                  <button className="btn btn-success" onClick={this.addTeamMember.bind(this, x)} type="button">Add</button>
                </td>
              </tr>
            </tbody>
        )  }) }
        </table>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li>
              <a role="button" onClick={this.performAnotherSearch.bind(this, this.props.links.prev)} aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li>
              <a role="button" onClick={this.performAnotherSearch.bind(this, this.props.links.next)} aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
      </nav>
    </div>
      </div>
    </div>
    );
  }
}

export default SearchResults;
