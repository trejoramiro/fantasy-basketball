package databaseutil

import (

	"database/sql"
	// "fmt"
	"time"
	_ "github.com/lib/pq"

)

type Player struct {
	ID int `json:"id"`
	FIRSTNAME string `json:"firstname"`
	LASTNAME string `json:"lastname"`
	ACTIVE bool `json:"active"`
	CAREER_START string `json:"career_start"`
	CAREER_END string `json:"career_end"`
	BIRTHDATE time.Time `json:"birthdate"`
	COUNTRY string `json:"country"`
	SCHOOL string `json:"school"`
	JERSEY string `json:"jersey"`
	POSITION string `json:"position"`
	HEIGHT string `json:"height"`
	WEIGHT string `json:"weight"`
	CURRENT_PLAYER bool `json:"current_player"`
	LAST_AFFILIATION string `json:"last_affiliation"`
	API_ID int `json:"api_id"`
	TEAM_ID string `json:"team_id"`
	TEAM_NAME string `json:"team_name"`
	TEAM_ABB string `json:"team_abb"`
	TEAM_CODE string `json:"team_code"`
	TEAM_CITY string `json:"team_city"`
}

type Stat struct {
	ID int `json:"id"`
	PLAYER_ID int `json:"player_id"`
	TIMEFRAME string `json:"timeframe"`
	PTS int `json:"pts"`
	AST int `json:"ast"`
	REB int `json:"reb"`
}

var DB *sql.DB

func init() {
	var err error
	DB, err = sql.Open("postgres", "user=ramirotrejo dbname=nba password=2lluw3x sslmode=disable")
	if err != nil {
		panic(err)
	}
}

func PlayerSearchQuery() (players []Player, err error) {
	 rows, err := DB.Query("SELECT id, first_name, last_name, career_start, career_end, birthdate, country, school, jersey, position, height, weight, current_player, last_affiliation, api_id, team_id, team_name, team_abb, team_code, team_city FROM players LIMIT 5;")
	 if err != nil {
		 return
	 }
	 for rows.Next() {
		 player := Player{}
		 err = rows.Scan(&player.ID,
			 							 &player.FIRSTNAME,
										 &player.LASTNAME,
										 &player.CAREER_START,
										 &player.CAREER_END,
										 &player.BIRTHDATE,
										 &player.COUNTRY,
										 &player.SCHOOL,
										 &player.JERSEY,
										 &player.POSITION,
										 &player.HEIGHT,
										 &player.WEIGHT,
										 &player.CURRENT_PLAYER,
										 &player.LAST_AFFILIATION,
										 &player.API_ID,
										 &player.TEAM_ID,
										 &player.TEAM_NAME,
										 &player.TEAM_ABB,
										 &player.TEAM_CODE,
										 &player.TEAM_CITY)

		 if err != nil {
			 return
		 }
		 players = append(players, player)
	 }
	 rows.Close()
	 // why these vague returns?
	 return
}
