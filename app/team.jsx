import React from 'react';

class Team extends React.Component {
  constructor(props){
    super(props);
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
                      <h4>{ x.lastname }</h4><h5>{ x.firstname }</h5>
                      <h5>Pts: 0 </h5>
                      <h5>Ast: 0 </h5>
                      <h5>Reb: 0 </h5>
                      <button className="btn btn-warning">Remove</button>
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
