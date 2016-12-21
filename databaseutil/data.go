package databaseutil

import (

	"database/sql"
	"time"
	_ "github.com/lib/pq"
	"strconv"

)


type Link struct {
	PREV string `json:"prev"`
	NEXT string `json:"next"`
}

type Player struct {
	ID int `json:"id"`
	FIRSTNAME string `json:"firstname"`
	LASTNAME string `json:"lastname"`
	ACTIVE bool `json:"active"`
	CAREER_START string `json:"career_start"`
	CAREER_END string `json:"career_end"`
	BIRTHDATE time.Time `json:"birthdate"`
	JERSEY string `json:"jersey"`
	POSITION string `json:"position"`
	HEIGHT string `json:"height"`
	WEIGHT string `json:"weight"`
	CURRENT_PLAYER bool `json:"current_player"`
	API_ID int `json:"api_id"`
	TEAM_ID string `json:"team_id"`
	TEAM_NAME string `json:"team_name"`
	TEAM_ABB string `json:"team_abb"`
	TEAM_CODE string `json:"team_code"`
	TEAM_CITY string `json:"team_city"`
	PTS int `json:"pts"`
	AST int `json:"ast"`
	REB int `json:"reb"`
}

type Stat struct {
	ID int `json:"id"`
	PLAYER_ID int `json:"player_id"`
	TIMEFRAME string `json:"timeframe"`
	PTS int `json:"pts"`
	AST int `json:"ast"`
	REB int `json:"reb"`
}

type Search struct {
	DATA []Player `json:"data"`
	LINK Link `json:"link"`
}

var DB *sql.DB

func init() {
	var err error
	DB, err = sql.Open("postgres", "user=ramirotrejo dbname=nba password=2lluw3x sslmode=disable")
	if err != nil {
		panic(err)
	}
}


func PlayerSearchQuery(queryValues [3]string) (search []Search, err error) {

	var players []Player

	qType := queryValues[0]
	qText := queryValues[1]
	qOffset := queryValues[2]

	var queryString string

	if qType == "name" {

		queryString = "SELECT players.id, players.first_name, players.last_name, players.career_start, players.career_end, players.birthdate, players.jersey, players.position, players.height, players.weight, players.current_player, players.api_id, players.team_id, players.team_name, players.team_abb, players.team_code, players.team_city, stats.pts, stats.ast, stats.reb FROM players INNER JOIN stats ON players.id=stats.player_id AND players.current_player=TRUE WHERE players.first_name='" + "Jimmy" + "' AND players.last_name='" + "Butler" + "' ORDER BY stats.pts DESC, players.last_name ASC LIMIT 6 OFFEST " + qOffset + ";"

	} else if qType == "position" {

		queryString = "SELECT players.id, players.first_name, players.last_name, players.career_start, players.career_end, players.birthdate, players.jersey, players.position, players.height, players.weight, players.current_player, players.api_id, players.team_id, players.team_name, players.team_abb, players.team_code, players.team_city, stats.pts, stats.ast, stats.reb FROM players INNER JOIN stats ON players.id=stats.player_id AND players.current_player=TRUE WHERE players.position='" + qText + "' ORDER BY stats.pts DESC, players.last_name ASC LIMIT 6 OFFSET " + qOffset + ";"

	} else if qType == "historic" {

		queryString = "SELECT players.id, players.first_name, players.last_name, players.career_start, players.career_end, players.birthdate, players.jersey, players.position, players.height, players.weight, players.current_player, players.api_id, players.team_id, players.team_name, players.team_abb, players.team_code, players.team_city, stats.pts, stats.ast, stats.reb FROM players INNER JOIN stats ON players.id=stats.player_id AND players.current_player=FALSE ORDER BY stats.pts DESC, players.last_name ASC LIMIT 6 OFFSET " + qOffset + ";"

	} else if qType == "team" {

		queryString = "SELECT players.id, players.first_name, players.last_name, players.career_start, players.career_end, players.birthdate, players.jersey, players.position, players.height, players.weight, players.current_player, players.api_id, players.team_id, players.team_name, players.team_abb, players.team_code, players.team_city, stats.pts, stats.ast, stats.reb FROM players INNER JOIN stats ON players.id=stats.player_id AND players.current_player=TRUE WHERE players.team_abb='" + qText + "' ORDER BY stats.pts DESC, players.last_name ASC LIMIT 6 OFFSET " + qOffset + ";"

	} else {

		queryString = "SELECT players.id, players.first_name, players.last_name, players.career_start, players.career_end, players.birthdate, players.country, players.school, players.jersey, players.position, players.height, players.weight, players.current_player, players.last_affiliation, players.api_id, players.team_id, players.team_name, players.team_abb, players.team_code, players.team_city, stats.pts, stats.ast, stats.reb FROM players INNER JOIN stats ON players.id=stats.player_id AND players.current_player=TRUE ORDER BY stats.pts DESC, players.last_name ASC LIMIT 6 OFFSET " + qOffset + ";"
	}

	rows, err := DB.Query(queryString)

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
										 &player.JERSEY,
										 &player.POSITION,
										 &player.HEIGHT,
										 &player.WEIGHT,
										 &player.CURRENT_PLAYER,
										 &player.API_ID,
										 &player.TEAM_ID,
										 &player.TEAM_NAME,
										 &player.TEAM_ABB,
										 &player.TEAM_CODE,
										 &player.TEAM_CITY,
									 	 &player.PTS,
									 	 &player.AST,
									   &player.REB)

		if err != nil {
			 return
		}
		players = append(players, player)

	 }

	 rows.Close()

	 links := Link{}
	 var prevLink string
	 var nextLink string

	 i, _ := strconv.Atoi(qOffset)

	 if i == 0 {
		 minusOffset := 0
		 plusOffset := i + 6

		 prevLink = "/search?type=" + qType + "&text=" + qText + "&offset=" + strconv.Itoa(minusOffset)
		 nextLink = "/search?type=" + qType + "&text=" + qText + "&offset=" + strconv.Itoa(plusOffset)

		 links.PREV = prevLink
		 links.NEXT = nextLink

	 } else {
		 minusOffset := i - 6
		 plusOffset := i + 6

		 prevLink = "/search?type=" + qType + "&text=" + qText + "&offset=" + strconv.Itoa(minusOffset)
		 nextLink = "/search?type=" + qType + "&text=" + qText + "&offset=" + strconv.Itoa(plusOffset)

		 links.PREV = prevLink
		 links.NEXT = nextLink

	 }

	 searchData := Search{}
	 searchData.DATA = players
	 searchData.LINK = links

	 search = append(search, searchData)

	 return
}
