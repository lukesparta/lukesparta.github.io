document.addEventListener("DOMContentLoaded", function () {
  let redGamePath = [33, 34, 48, 49,
    91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7,
    8, 23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 216, 201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120, 105,
    106, 107, 108, 109, 110, 111, 112
  ]
  let blueGamePath = [41, 42, 56, 57,
    23, 38, 53, 68, 83, 99,
    100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120,
    105, 90, 91, 92, 93, 94, 95,
    81, 66, 51, 36, 21, 6, 7, 22, 37,
    52, 67, 82, 97, 112
  ]
  let greenGamePath = [176, 177, 191, 192,
    133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 201, 186, 171, 156,
    141, 126, 125, 124, 123, 122, 121, 120, 105,
    90, 91, 92, 93, 94, 95, 81, 66,
    51, 36, 21, 6, 7, 8, 23, 38, 53, 68,
    83, 99, 100, 101, 102, 103, 104, 119,
    118, 117, 116, 115, 114, 113, 112
  ]
  let yellowGamePath = [167, 168, 182, 183,
    201, 186, 171, 156,
    141, 125, 124, 123, 122, 121, 120, 105,
    90, 91, 92, 93, 94, 95, 81, 66,
    51, 36, 21, 6, 7, 8, 23, 38, 53, 68,
    83, 99, 100, 101, 102, 103, 104, 119,
    134, 133, 132, 131, 130, 129,
    143, 158, 173, 188, 203, 218,
    217, 202, 187, 172, 157, 142, 127, 112
  ]
  let redHomeCount = 0;
  let blueHomeCount = 0;
  let yellowHomeCount = 0;
  let greenHomeCount = 0;

  const players = ["red", "blue", "yellow", "green"]
  const playingPlayers = [];
  let diceRollValue;

  //Red Counter Variables
  let redCountersYard = ["red-one", "red-two", "red-three", "red-four"];
  let redCountersPlaying = [];
  let redCountersPos = [];

  //Blue Counter Variables
  let blueCountersYard = ["blue-one", "blue-two", "blue-three", "blue-four"];
  let blueCountersPlaying = [];
  let blueCountersPos = [];

  //Yellow Counter Variables
  let yellowCountersYard = ["yellow-one", "yellow-two", "yellow-three", "yellow-four"];
  let yellowCountersPlaying = [];
  let yellowCountersPos = [];

  //Green Counter Variables
  let greenCountersYard = ["green-one", "green-two", "green-three", "green-four"];
  let greenCountersPlaying = [];
  let greenCountersPos = [];

  document.getElementsByClassName("dice-btn")[1].disabled = true;

  const playGame = document.getElementById("playGameBtn");
  playGame.addEventListener("click", function () {
    document.getElementsByClassName("container")[0].setAttribute("class", "container hidden");
    document.getElementsByClassName("players")[0].classList.remove("hidden");
  });

  const startGame = document.getElementById("startGameBtn");
  let twoRadio = document.getElementById("twoRadio");
  let threeRadio = document.getElementById("threeRadio");
  let fourRadio = document.getElementById("fourRadio");

  var name = document.getElementsByClassName("player-name");
  startGame.addEventListener("click", function () {
    document.getElementsByClassName("players")[0].setAttribute("class", "container hidden players");
    document.getElementsByClassName("game-container")[0].classList.remove("hidden");
    //  How many players are playing and appends the players to the game board on the left.
    if (twoRadio.checked) {
      createPlayer(2)
    } else if (threeRadio.checked) {
      createPlayer(3);
    } else {
      createPlayer(4);
    }
  });

  function createPlayer(numofP){
    for (let i = 0; i < numofP; i++) {
      playingPlayers.push(players[i]);
      if (i === 0) {
        name[i].innerHTML = players[i] + " it's your turn";
      } else {
        name[i].innerHTML = players[i]
      }
    }
  }

  //On click of the dice button
  var diceBtn = document.getElementsByClassName("dice-btn")[0];
  var nextTurnBtn = document.getElementsByClassName("dice-btn")[1];
  diceBtn.addEventListener("click", function () {
    diceBtn.disabled = true;
    nextTurnBtn.disabled = false;
    var name = document.getElementsByClassName("player-name");
    //If its Red Players Turn
    if (name[0].innerHTML === "red it's your turn") {
      playerTurn("red", 0);
    }
    //If its Blue Players Turn
    else if (name[1].innerHTML === "blue it's your turn") {
      playerTurn("blue", 1);
    }
    //If its Yellow Players Turn
    else if (name[2].innerHTML === "yellow it's your turn") {
      playerTurn("yellow", 2);
    }
    //If its Green Players Turn
    else {
      playerTurn("green", 3);
    }
  });



  function playerTurn(color, index) {
    let counterYard;
    let countersInPlay;
    let gridBox = document.getElementsByClassName("grid-item");
    var rd = rollDice()
    let gamePath;
    let playerName = document.getElementsByClassName("player-name")[index];
    let passBtn = document.getElementsByClassName("dice-btn")[1];
    let dice = document.getElementById("diceButton");
    let turn = document.getElementById("turnButton");

    if (color === "red") {
      counterYard = redCountersYard;
      countersInPlay = redCountersPlaying;
      gamePath = redGamePath;
    } else if (color === "blue") {
      counterYard = blueCountersYard;
      countersInPlay = blueCountersPlaying;
      gamePath = blueGamePath;
    } else if (color === "yellow") {
      counterYard = yellowCountersYard;
      countersInPlay = yellowCountersPlaying;
      gamePath = yellowGamePath;
    } else {
      counterYard = greenCountersYard;
      countersInPlay = greenCountersPlaying;
      gamePath = greenGamePath;
    }

    /*              COUNTER MOVING CONDITIONS             */

    //    Rolled a 6 --- Counters in home --- Counters in play --- Start Empty
    if (rd === 6 && counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. A counter has been taken from your home and is now in play.`;
      clickCounter();
    }

    //    Rolled a 6 --- Counters in home --- No Counters in play --- Start empty
    else if (rd === 6 && counterYard.length > 0 && countersInPlay.length == 0 && gridBox[gamePath[4]].innerHTML == "") {
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. A counter has been taken from your home and is now in play.`;
      clickCounter();
    }

    else if (rd === 6 && counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      document.getElementsByClassName("dice-btn")[1].disabled = true;
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      listenForClick();
    }

    //    Rolled a 6 --- No Counters in home -- Counters in play -- Start not empty
    else if (rd === 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      document.getElementsByClassName("dice-btn")[1].disabled = true;
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      listenForClick();
    }

    //    Rolled a 6 --- No Counters in home -- Counters in play -- Start empty
    else if (rd === 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      document.getElementsByClassName("dice-btn")[1].disabled = true;
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      listenForClick();
    }

    //    Rolled any value --- Counters in home -- Counters in Play --- Start not empty
    else if (counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      document.getElementsByClassName("dice-btn")[1].disabled = true;
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      listenForClick();
    }

    //    Rolled < 6 --- Counters in home --- Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length > 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      document.getElementsByClassName("dice-btn")[1].disabled = true;
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      listenForClick();
    }

    //    Rolled < 6 --- Counters in home --- No Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length > 0 && countersInPlay.length == 0 && gridBox[gamePath[4]].innerHTML == "") {
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. You have no counters in play and need to roll a 6 to release a counter from your home. Better luck next time.`;
      clickTurnBtn();
    }

    //    Rolled < 6 --- NO counters in home --- Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML == "") {
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      clickTurnBtn();
    }

    //    Rolled < 6 --- NO counters in home --- Counters in play --- Start Empty
    else if (rd < 6 && counterYard.length == 0 && countersInPlay.length > 0 && gridBox[gamePath[4]].innerHTML != "") {
      playerName.innerHTML = `\n\nYou Rolled a ${rd}. Please click a counter in play to move.`;
      clickTurnBtn();
    }
    else {
      debugger;
      alert("no condition");
    }

    //  Function to listen for click of the pass turn button and then change player by calling the change player function.
    function clickTurnBtn(){
      passBtn.addEventListener("click", function () {
        document.getElementsByClassName("dice-btn")[0].disabled = false;
        document.getElementsByClassName("dice-btn")[1].disabled = true;
        changePlayer();
      });
    }


    //    Function to take counter from players Yard and place it in the start position on the board
    function clickCounter(){
      countersInPlay.push(counterYard.shift());
      var yardCounter = document.getElementsByClassName(countersInPlay[countersInPlay.length - 1])[0];
      document.getElementsByClassName("grid-item")[gamePath[4]].innerHTML = `<div class='${color}-counter'></div>`; // Places counter to start position
      yardCounter.removeAttribute("class", `${color}-counter`); // Removes a counter from yard
      //changes player when user clicks pass button
      clickTurnBtn();
    }


    //    Function that listens for the user to click on a square with their counter
    function listenForClick(){
      loopThroughGrid();
      clickTurnBtn();
    }


    function sendBackHome(playerColor, indexNum){
      var cCY;
      var cCP;
      if(playerColor == "red"){
        cCY = redCountersYard
        cCP = redCountersPlaying
      }
      else if(playerColor == "blue"){
        cCY = blueCountersYard
        cCP = blueCountersPlaying
      }
      else if(playerColor == "yellow"){
        cCY = yellowCountersYard
        cCP = yellowCountersPlaying
      }
      else{
        cCY = greenCountersYard
        cCP = greenCountersPlaying
      }
      var setNum = cCY.length + 1;
      if (cCY.length === 3) {
        setNum = "one";
      } else if (cCY.length === 2) {
        setNum = "two";
      } else if (cCY.length === 1) {
        setNum = "three";
      } else if (cCY.length === 0) {
        setNum = "four";
      }
      cCP.shift();
      cCY.push(cCP[0]);
      elem = document.getElementsByClassName(`${playerColor}-home-${setNum}`)[0];
      elem.innerHTML = `<div class="${playingPlayers[indexNum]}-counter ${playerColor}-${setNum}"></div>`; // Places counter back to yard
    }


    //    Loops through board and adds event listen to every square 
    function loopThroughGrid() {
      // Loops through each grid item and places an event listener on it
      for (let i = 4; i < 225; i++) {
        gridBox[i].addEventListener("click", function () {
          // if a counter is found in a grid
          if (gridBox[i].innerHTML == `<div class="${color}-counter"></div>`) {
            //  loops through game path array
            for (let j = 0; j < gamePath.length; j++) {
              //  if the grid location is found in the array move the counter x amount of spaces from that position according to the value of the dice roll.
              if (gamePath[j] == i) {
                let counterLoc = gamePath.indexOf(i); // Clicked square location
                //  if the dice roll amount is < the path length of the players route
                if ((diceRollValue + counterLoc) < gamePath.length) {
                  // if the square the player is trying to move to contains one of their counters
                  if (gridBox[gamePath[counterLoc + diceRollValue]].innerHTML == `<div class="${color}-counter"></div>`) {
                    document.getElementById("message").innerHTML = "You already have a counter in the position you want to move to.";
                  } 
                  //  if the square the player is trying to move to contains another players cpounter.  
                  else if (gridBox[gamePath[counterLoc + diceRollValue]].innerHTML != `<div class="${color}-counter"></div>` && gridBox[gamePath[counterLoc + diceRollValue]].innerHTML != "") {
                    //  loop thorugh the array of the playing players
                    for (let m = 0; m < playingPlayers.length; m++) {
                      // if the color found in the array doesnt match the current players color
                      if (playingPlayers[m] != color) {
                        //  if the counter in the square the player wants to move is equal to the current colour in the array
                        if (gridBox[gamePath[counterLoc + diceRollValue]].innerHTML.includes(playingPlayers[m])) {
                          gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`; //  move players counter to the square
                          gridBox[i].innerHTML = ""; // clear the one they just come from 


                          //  Conditions for each color to send back to their yard
                          if (playingPlayers[m] == "red") {
                            sendBackHome("red", m);
                          } else if (playingPlayers[m] == "blue") {
                            sendBackHome("blue", m)
                          } else if (playingPlayers[m] == "yellow") {
                            sendBackHome("yellow", m)
                            sendBackHome("green", m);
                          }
                        }
                      }
                    }
                  } 
                  //  if players counter has reached home
                  else if (gamePath[counterLoc + diceRollValue] == gamePath[gamePath.length - 1]) {
                    gridBox[i].innerHTML = "";
                    gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`
                    setTimeout(function () {
                      gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = "";
                      if (color == "red") {
                        redHomeCount++
                        redCountersPlaying.shift();
                        if (redHomeCount === 4) {
                          document.getElementById("winner").innerHTML = "<p>Congratulations Red\n\nYou Won !!\n\n</p><br><br><button>Play Again</button>";
                          document.getElementsByClassName("outer-winner")[0].classList.remove("hidden");
                        }
                      } else if (color = "blue") {
                        blueHomeCount++;
                        blueCountersPlaying.shift();
                        if (blueHomeCount === 4) {
                          document.getElementById("winner").innerHTML = "Congratulations Blue\n\nYou Won !!\n\n</p><br><br><button>Play Again</button>"
                          document.getElementsByClassName("outer-winner")[0].classList.remove("hidden");
                        }
                      } else if (color = "yellow") {
                        yellowHomeCount++;
                        yellowCountersPlaying.shift();
                        if (yellowHomeCount === 4) {
                          document.getElementById("winner").innerHTML = "Congratulations Yellow\n\nYou Won !!\n\n</p><br><br><button>Play Again</button>"
                          document.getElementsByClassName("outer-winner")[0].classList.remove("hidden");
                        }
                      } else {
                        greenHomeCount++;
                        greenCountersPlaying.shift();
                        if (greenHomeCount === 4) {
                          document.getElementById("winner").innerHTML = "Congratulations Green\n\nYou Won !!\n\n</p><br><br><button>Play Again</button>"
                          document.getElementsByClassName("outer-winner")[0].classList.remove("hidden");
                        }
                      }
                    }, 2000);

                  } 
                  else {
                    gridBox[gamePath[counterLoc + diceRollValue]].innerHTML = `<div class="${color}-counter"></div>`;
                    gridBox[i].innerHTML = ""; //clear grid item
                    changePlayer();
                    document.getElementsByClassName("dice-btn")[1].disabled = true;
                    document.getElementsByClassName("dice-btn")[0].disabled = false;
                  }
                }
                
                //No space to move counter
                else {
                  console.log("you dont have enough space.");
                  document.getElementsByClassName("dice-btn")[1].disabled = false;
                  clickTurnBtn();
                }
              }
            }
          }
        });
      }
    }

    function changePlayer() {
      document.getElementById("message").innerHTML = "";
      if (playingPlayers.indexOf(color) != playingPlayers.length - 1) {
        var newPlayer = playingPlayers[playingPlayers.indexOf(color) + 1]
        if (newPlayer == "blue") {
          dice.style.background = "blue";
          for (let l = 0; l < playingPlayers.length; l++) {
            name[l].innerHTML = playingPlayers[l];
          }
          name[1].innerHTML = "blue it's your turn";
        } else if (newPlayer == "yellow") {
          dice.style.background = "yellow";
          for (let l = 0; l < playingPlayers.length; l++) {
            name[l].innerHTML = playingPlayers[l];
          }
          name[2].innerHTML = "yellow it's your turn";
        } else {
          dice.style.background = "green";
          currentPlayer = "green"
          for (let l = 0; l < playingPlayers.length; l++) {
            name[l].innerHTML = playingPlayers[l];
          }
          name[3].innerHTML = "green it's your turn";
        }
      } else {
        dice.style.background = "red";
        newPlayer = playingPlayers[0];
        for (let l = 0; l < playingPlayers.length; l++) {
          name[l].innerHTML = playingPlayers[l];
        }
        name[0].innerHTML = "red it's your turn";
      }
    }

  } //  END OF PlayerTurn FUNCTION

  function rollDice() {
    var randomNumber = Math.floor(Math.random() * 6) + 1;
    diceRollValue = randomNumber;
    return randomNumber;
  }
}); //  END OF DOMContentLoaded