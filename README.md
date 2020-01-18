## Node Express Mongoose

Node.js application provides apis for playing BattleShips, the Game.
Uses Node, Express and MongoDB.

## Usage
    
##### SET UP THE APPLICATION:
    git clone https://github.com/OmegaShAwn/battle-ships.git
    cd battle-ships
    npm install
    cp config.js.example config.js


##### TO RUN THE APPLICATION:
    npm start


##### TO RUN THE TESTS IN THE APPLICATION:
    npm test


## PLAYING THE GAME:
#####  To Start the Game:
- Get Request to http://localhost:3000/start
- Response will be GAME-ID
##### To View the status of the Game:
- Get Request to http://localhost:3000/{GAME-ID}/status
##### To Place a ship:
- Get Request to http://localhost:3000/{GAME-ID}/place
- Query Parameters:\
    i) xPos (0-9)\
    ii) yPos (0-9)\
    iii) ship (battleship, cruiser, submarine, destroyer)\
    iv) vertical (true)[optional, false by default]
- example: http://localhost:3000/5e2188b6a872950698012ef6/place?xPos=1&yPos=0&ship=battleship&vertical=true
##### To Attack a coordinate:
- Get Request to http://localhost:3000/{GAME-ID}/attack
- Query Parameters:\
    i) xPos (0, 9)\
    ii) yPos (0, 9)
- example: http://localhost:3000/5e2188b6a872950698012ef6/attack?xPos=1&yPos=0