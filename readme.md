## Tennis scoring simulator

This little app simulates a tennis match between 2 players. The simulator plays out the match by randomly selecting which
player wins the next point, then the scoring system calculates the score in progress. The match simply ends as soon as one player wins a set. Look to the index.js file for starting the simulation - a point is played every 500ms until a player wins the match. This is an exercise in TDD, unit tests are written first in order to solidify the underlying logic before writing the application code. 

## Pre-requisites
- make sure you have installed node.js
- npm install

## Running the app
- node index.js

## Running the tests
- npm test