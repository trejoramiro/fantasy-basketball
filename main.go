package main

import (
  "fmt"
  "encoding/json"
  "net/http"
  "nba-fantasy-app/databaseutil"
  "os"
)

func process(w http.ResponseWriter, r *http.Request) {
    data, err := databaseutil.PlayerSearchQuery()

    output, err := json.MarshalIndent(&data, "", "\t\t")
    if err != nil {
      return
    }

    w.Header().Set("Content-Type", "application/json")
    w.Write(output)
    return
}


func main() {

  // fetch data from the database
  data, err := databaseutil.PlayerSearchQuery()
  if (err != nil) {
    fmt.Println(err)
  }

  // // encrypt data to json
  jsonData, err := json.Marshal(data)

  jsonFile, err := os.Create("index.json")
  if err != nil {
    fmt.Println("Error creating JSON file:", err)
    return
  }

  // create json file
  encoder := json.NewEncoder(jsonFile)
  err = encoder.Encode(jsonData)
  if err != nil {
    fmt.Println("Error:", err)
    return
  }

  http.Handle("/", http.FileServer(http.Dir("./src/nba-fantasy-app/build")))
  http.HandleFunc("/data", process)
  http.ListenAndServe(":8080", nil)

}
