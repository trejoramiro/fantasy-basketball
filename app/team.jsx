import React from 'react';

class Team extends React.Component {
  constructor(props) {
    super(props);
  }

  removeTeamMember(index) {
    this.props.removeTeamMember(index);
  }

  render() {
    return (
      <div>
        <div className="row">
          {
              this.props.team.map((x) =>  { return(
                <div className="col-md-3" key={ x.id }>
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      <div className="panel-title">
                        <h4>{ x.position }</h4>
                      </div>
                    </div>
                    <div className="panel-body">
                      <a href="#" className="thumbnail">
                        <img src={ x.img_url } alt={ x.lastname }/>
                      </a>
                      <h4>{ x.lastname }</h4><h5>{ x.firstname }</h5>
                      <h5>Pts: {x.pts} </h5>
                      <h5>Ast: {x.ast}  </h5>
                      <h5>Reb: {x.reb} </h5>
                      <button className="btn btn-warning" onClick={this.removeTeamMember.bind(this, x.id)}>Remove</button>
                    </div>
                  </div>
                </div>)
              }
            )
          }
        </div>
      </div>
    )
  }
}
export default Team;
