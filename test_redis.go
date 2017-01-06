package main

import (
  "fmt"
  "gopkg.in/redis.v5"
)


func main() {
  client := redis.NewClient(&redis.Options{
    Addr: "localhost:6379",
    Password: "",
    DB: 0,
  })

  pong, err := client.Ping().Result()
  fmt.Println(pong, err)

  err = client.Set("MSG", "Hello World", 0).Err()
  if err != nil {
    panic(err)
  }

  val, err := client.Get("MSG").Result()
  if err != nil {
    panic(err)
  }
  fmt.Println("MSG", val)


}
