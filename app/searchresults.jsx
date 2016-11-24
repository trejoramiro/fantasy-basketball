import React from 'react';

class SearchResults extends React.Component {
  render() {
    return (
        <div>
          <div className="row">
            <div className="col-md-12">
          <table className="table table-bordered">
            <tbody>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Pts</th>
              <th>Ast</th>
              <th>Reb</th>
              <th>Action</th>
            </tr>
          </tbody>
            { this.props.team.map((x) => { return (
              <tbody key={x.id}>
              <tr>
                <td>
                  { x.id }
                </td>
                <td>
                  { x.firstName }
                </td>
                <td>
                  { x.lastName }
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
                  <button className="btn btn-success" href="#" type="submit">Add</button>
                </td>
              </tr>
            </tbody>
        )  }) }
        </table>
        <nav aria-label="Page navigation">
          <ul className="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li>
              <a href="#" aria-label="Next">
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
