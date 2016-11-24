export default class Backend {
  constructor() {
    //make ajax call to go server
    this.team = []
      fetch('data').then(function(response) {
        return response.json().then(function(json) {
          this.team = json;
        });
    });
   }


}
