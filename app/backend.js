export default class Backend {
  constructor() {
    this.team = [{id: 1, firstname: "Lebron", lastname: "James", pts: 30, ast: 15, reb: 6, position: "Power Forward" },{id: 2, firstname: "Russel", lastname: "Westbrook", pts: 31, ast: 14, reb: 10, position: "Point Guard"},{id: 3, firstname: "Kevin", lastname: "Durant", pts: 27, ast: 12, reb: 8, position: "Gaurd" }];
    this.players;

  };


   loadDataFromServer() {
     var _this = this
     fetch('search').then(function(response){
       return response.json();
     }).then(function(data){
       _this.players = data;
     });
   }

}
