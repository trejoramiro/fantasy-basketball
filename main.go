package main

import (
  "fmt"
  "encoding/json"
  "net/http"
  "nba-fantasy-app/databaseutil"

)

func process(w http.ResponseWriter, r *http.Request) {

    qType := r.URL.Query()["type"][0]
    qText := r.URL.Query()["text"][0]
    qOffset := r.URL.Query()["offset"][0]

    var v [3]string
    v[0] = qType
    v[1] = qText
    v[2] = qOffset

    data, err := databaseutil.PlayerSearchQuery(v)

    output, err := json.MarshalIndent(&data, "", "\t\t")
    if err != nil {
      return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(output)
    return
}


func main() {

  http.Handle("/", http.FileServer(http.Dir("./src/nba-fantasy-app/build")))
  http.HandleFunc("/search", process)
  http.ListenAndServe(":8080", nil)

}
