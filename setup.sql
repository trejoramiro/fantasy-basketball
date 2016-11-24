
DROP TABLE IF EXISTS teams, players, stats;


CREATE TABLE players (

	id SERIAL PRIMARY KEY,
	first_name TEXT,
	last_name TEXT,
	career_start TEXT,
	career_end TEXT,
	birthdate TIMESTAMP,
	country TEXT,
	school TEXT,
	jersey TEXT,
	position TEXT,
	height TEXT,
	weight TEXT,
	last_affiliation TEXT,
	current_player BOOLEAN,
	api_id INTEGER,
	team_id INTEGER,
	team_name TEXT,
	team_abb TEXT,
	team_code TEXT,
	team_city TEXT

);


CREATE TABLE stats (

	id SERIAL PRIMARY KEY,
	player_id INTEGER REFERENCES players(id),
	timeframe TEXT,
	pts INTEGER,
	ast INTEGER,
	reb INTEGER

);
