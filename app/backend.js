export default class Backend {
  constructor() {
    //make ajax call to go server url: 'data'
    this.team = [];
  };

   loadDataFromServer() {
     var _this = this
     fetch('data').then(function(response){
      //  console.log(response.json());
       return response.json();
     }).then(function(data){
       _this.team = data;
     });
   }

}
