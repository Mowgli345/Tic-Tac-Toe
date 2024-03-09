let player1Wins=0;
let player2Wins=0;
let compGame;

const newGameBtn = document.getElementById("newGame-btn");
const restartBtn = document.getElementById("restart-btn");

const gameModeDialog = document.getElementById("gameMode");
    const onePlayerGame = document.getElementById("onePlayer-btn");
    const twoPlayerGame = document.getElementById("twoPlayer-btn");

// ********* 1-Player Variables ************
const oneNameDialog = document.getElementById("onePlayerNameDialog");
const onePlayerNameForm = document.getElementById("onePlayerNameForm");
    const onePlayerName = document.getElementById("onePlayer-name");
    const onePlayerStart = document.getElementById("1PlayerStart-btn");


// ********* 2-Player Variables ************
const twoNamesDialog = document.getElementById("twoPlayerNameDialog");
const twoPlayerNameForm = document.querySelector("#twoPlayerNameForm");
    const twoPlayerName1= document.getElementById("twoPlayer-name1");
    const twoPlayerName2= document.getElementById("twoPlayer-name2");
    const twoPlayerStart = document.getElementById("2PlayerStart-btn");


// ************** Others ***************
const playAgainBtn = document.getElementById("playAgain-btn");
const exitBtn = document.getElementById("exit-btn");
const result = document.getElementById("result");
const winnerText = document.getElementById("winner-text");

const p1score = document.getElementById("player1-score");
const p2score = document.getElementById("player2-score");
const p1name = document.getElementById("player1-name");
const p2name = document.getElementById("player2-name");

const nextTurn = document.getElementById("nextTurn");



//  ******* Game Board Object ****************
const gameBoardObj = {
    myBoard: [],
    displayGrid (){
        const fragment = document.createDocumentFragment();
        const gameBoard = document.querySelector(".gameBoard");
        const row1 = document.createElement("div");
        const row2 = document.createElement("div");
        const row3 = document.createElement("div");

        const square0 = document.createElement("div");
            square0.className = "square";
            square0.setAttribute("data-square",0);
        const square1 = document.createElement("div");
            square1.className = "square";
            square1.setAttribute("data-square",1);
        const square2 = document.createElement("div");
            square2.className = "square";
            square2.setAttribute("data-square",2);
        const square3 = document.createElement("div");
            square3.className = "square";
            square3.setAttribute("data-square",3);
        const square4 = document.createElement("div");
            square4.className = "square";
            square4.setAttribute("data-square",4);
        const square5 = document.createElement("div");
            square5.className = "square";
            square5.setAttribute("data-square",5);
        const square6 = document.createElement("div");
            square6.className = "square";
            square6.setAttribute("data-square",6);
        const square7 = document.createElement("div");
            square7.className = "square";
            square7.setAttribute("data-square",7);
        const square8 = document.createElement("div");
            square8.className = "square";
            square8.setAttribute("data-square",8);

        row1.className="row row1";
        row2.className="row row2";
        row3.className="row row3";

        while(gameBoard.firstChild){
            gameBoard.removeChild(gameBoard.firstChild);
        }

        fragment.appendChild(row1);
            row1.appendChild(square0);
            row1.appendChild(square1);
            row1.appendChild(square2);
        fragment.appendChild(row2);
            row2.appendChild(square3);
            row2.appendChild(square4);
            row2.appendChild(square5);
        fragment.appendChild(row3);
            row3.appendChild(square6);
            row3.appendChild(square7);
            row3.appendChild(square8);
        
        gameBoard.appendChild(fragment);

        const square = document.querySelectorAll(".square");
        let i=0;
        Array.from(square).forEach((item)=> { 
            item.textContent= gameBoardObj.myBoard[i];
            i++;
            }        
            )
    },
    setClickEvent(player,playerObjects){  //Assigns event listenr to all squares
        const squares = document.querySelectorAll(".square");
        Array.from(squares).forEach((square) => {
            square.addEventListener("click", squInput)
        });            
    function squInput(square) {    //Event Listenter to allow player input
        let arrayMarker = square.target.dataset.square; 
        if (gameBoardObj.myBoard[arrayMarker]==undefined) {             
            square.textContent=player.marker;  
            gameBoardObj.myBoard[arrayMarker]=player.marker;                              
            if (gameObj.checkWin(playerObjects) || gameObj.checkTie()) { 
                gameBoardObj.displayGrid(); 
                return;
                }             
            else playGame(playerObjects);
            }; 
        }                  
        }
}

// 1st - Shows 1 or 2 Player Game
newGameBtn.addEventListener("click",(e)=>{     
    gameModeDialog.showModal();

    onePlayerGame.addEventListener("click",(e)=>{
        compGame=true;
        gameModeDialog.close();
        oneNameDialog.showModal();
        console.log(onePlayerName);
        onePlayerName.value = "";
            });

    twoPlayerGame.addEventListener("click",(e)=>{
        gameModeDialog.close();
        twoNamesDialog.showModal();
        twoPlayerName1.value = "";
        twoPlayerName2.value = "";
        });
});

//  ********** 1-Player Game ***************
onePlayerNameForm.addEventListener("submit",(e)=>{  //Closes names dialog, invokes newCompGame()
    e.preventDefault();
    oneNameDialog.close();
    newCompGame()
}); 
function newCompGame () {   // Invoked on 1-Player Let's Play button -   
    gameBoardObj.myBoard.length=0;
    gameObj.turnCounter=0;
    let playerObjects = getCompNames();
    gameBoardObj.displayGrid(); 
    let nextPlayer = gameObj.setTurnComp(playerObjects);         
    gameBoardObj.setClickEvent(nextPlayer,playerObjects);    
};
function getCompNames() {          //Gets Player Names for 1-player game
    // const playerName1 = onePlayerName.value;
    const playerName1 = "Jimmy";
    const player1 = Player(playerName1, "0");
    const player2 = Player("Computer", "X");
    p1name.innerHTML=(`${playerName1}`);
    p2name.innerHTML=(`${player2.name}`);
    return {player1, player2};
};

// ******** 2-Player Game *********
function getNames() {               //Gets Player Names for 2-player game
    const playerName1 = twoPlayerName1.value;
    const playerName2 = twoPlayerName2.value;
    const player1 = Player(playerName1, "0");
    const player2 = Player(playerName2, "X");
    twoNamesDialog.close();
    p1name.innerHTML=(`${playerName1}`);
    p2name.innerHTML=(`${playerName2}`);
    return {player1, player2};
};
twoPlayerNameForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    new2Game()
});  
function new2Game () {  // Runs when Let's Play button hit on 2-player names input form
    gameBoardObj.myBoard.length=0;
    gameObj.turnCounter=0;
    let playerObjects = getNames();
    gameBoardObj.displayGrid();
    let nextPlayer = gameObj.setTurn(playerObjects);          //Passes players 1 and 2 to setTurn
    gameBoardObj.setClickEvent(nextPlayer,playerObjects);      //Passes next player
};


// GameObject - contains turn-taking and results
const gameObj = {
    turnCounter:0,
    setTurn (playerObjects) { //Sets turn for 2-Player game
            let player1=playerObjects.player1;
            let player2=playerObjects.player2;

        function myTurn(player1, player2) {
            gameObj.turnCounter++;
            let nextPlayer;        
            if (gameObj.turnCounter%2!=0) {
                nextPlayer = player1;
                nextTurn.innerHTML=(`${player1.name} - make your move!`);
            }
            else {
                nextPlayer = player2;
                nextTurn.innerHTML=(`${player2.name} - make your move!`);
             }
            return nextPlayer;            //Returns next player
        };
        return myTurn(player1, player2);  //This is where the players are returned
    },
    setTurnComp (playerObjects) {
        let player1=playerObjects.player1;
        let player2=playerObjects.player2;
        let nextPlayer;

    function myTurnComp (player1, player2) {
        gameObj.turnCounter++;
        if (gameObj.turnCounter%2!=0) {
            nextPlayer = player1;
            nextTurn.innerHTML=(`${player1.name} - make your move!`);
        }
        else {      
            nextPlayer = player2;  
            nextTurn.innerHTML=(`It's ${player2.name}'s move!`);
            } 
        return nextPlayer;           
        };
        return myTurnComp(player1, player2, nextPlayer); 
    },
    printWinner(marker, players) {
        result.showModal();
        if (marker == players.player1.marker){
            winnerText.innerHTML=(`${players.player1.name} wins!`);
            player1Wins++;
            p1score.innerHTML=(`${player1Wins}`);
            return true;
        }
        else {
            winnerText.innerHTML=(`${players.player2.name} wins!`);
            result.appendChild(winnerText);
            player2Wins++;
            p2score.innerHTML=(`${player2Wins}`);
        }
        return true;
    },  
    checkWin(playerObjects) {
        let players = playerObjects;
        let myBoard= gameBoardObj.myBoard;   
        if (myBoard[0] != undefined && myBoard[0]===myBoard[1] && myBoard[1]===myBoard[2]){
            let marker = myBoard[0];
            this.printWinner(marker, players);
            return true;
        }
        if (myBoard[3] !=undefined && myBoard[3]===myBoard[4] && myBoard[4]===myBoard[5]){
            let marker = myBoard[3];
            this.printWinner(marker, players);
            return true;
         }
        if (myBoard[6] !=undefined && myBoard[6]===myBoard[7] && myBoard[7]===myBoard[8]){
            let marker = myBoard[6];
            this.printWinner(marker, players);
            return true;
        }
        if (myBoard[0] !=undefined && myBoard[0]===myBoard[3] && myBoard[3]===myBoard[6]){
            let marker = myBoard[0];
            this.printWinner(marker, players);
            return true;
        }
        if (myBoard[1] !=undefined && myBoard[1]===myBoard[4] && myBoard[4]===myBoard[7]){
            let marker = myBoard[1];
            this.printWinner(marker, players);
            return true;
        }
        if (myBoard[2] !=undefined && myBoard[2]===myBoard[5] && myBoard[5]===myBoard[8]){
            let marker = myBoard[2];
            this.printWinner(marker, players);
            return true;
        }
        if (myBoard[0] !=undefined && myBoard[0]===myBoard[4] && myBoard[4]===myBoard[8]){
            let marker = myBoard[0];
            this.printWinner(marker, players);
            return true;
        }
        if (myBoard[2] !=undefined && myBoard[2]===myBoard[4] && myBoard[4]===myBoard[6]){
            let marker = myBoard[2];
            this.printWinner(marker, players);
            return true;
        }
        else return false;
    },
    checkTie() {
        let i;
        for (i=0; i<=8; i++) {  
                if (gameBoardObj.myBoard[i] == undefined) {  
                return false;
                }
            }    
        result.showModal();    
        winnerText.innerHTML=(`It's a draw!`);
        return true;
    },
}


// ************* Player Functions *****************
function Player(name,marker) {  
    return {name, marker};
};
function playGame (playerObjects) {     //Allows next player to take their turn
    gameBoardObj.displayGrid();

    if (compGame) {

        let nextPlayer = gameObj.setTurnComp(playerObjects);  //Pass P1 & P2 to setTurn
            if (nextPlayer.name=="Computer") {
                let p2marker = nextPlayer.marker;
                console.log("Computer about to enter move");
                computerMoveLogic(p2marker);
                    if (gameObj.checkWin(playerObjects) || gameObj.checkTie()) {  
                        gameBoardObj.displayGrid();  //To end game on win/tie only
                        return;
                        }

                else {      //Runs if Comp move is not win/tie
                    gameBoardObj.displayGrid();
                    nextPlayer=gameObj.setTurnComp(playerObjects); 
                    gameBoardObj.setClickEvent(nextPlayer,playerObjects);  
                    };    
                };
                gameBoardObj.setClickEvent(nextPlayer,playerObjects);                           
        }

// ********* 2-Player Game Logic ***************
    else {    ////This is for 2-Player Game
        let nextPlayer = gameObj.setTurn(playerObjects);          
        gameBoardObj.setClickEvent(nextPlayer,playerObjects);     
    }
};

//  ********END GAME************

playAgainBtn.addEventListener("click",(e) =>{
    playAgain();
});
exitBtn.addEventListener("click",(e)=>{
    exitGame();
});
restartBtn.addEventListener("click",(e)=>{
    restartGame();
});

function playAgain() {          //Starts new new game, same players
    let myBoard= gameBoardObj.myBoard;
    myBoard.length=0;
    gameObj.turnCounter=0;
    let playerObjects;
    if (compGame) {
        playerObjects = getCompNames();
    }
    else {
        playerObjects = getNames();
    }
    playGame(playerObjects);
    result.close();
}

function restartGame() {   //Resets everything at end of game
 if (compGame) {
    newCompGame();
 }
 else {
    new2Game();
 }
}


function exitGame() {   //Resets everything at end of game
    result.close();
    compGame=false;
    twoPlayerName1.value = "";
    twoPlayerName2.value = "";
    player1Wins=0;
    player2Wins=0;
    p1score.innerHTML="";
    p2score.innerHTML="";
    p1name.innerHTML="";
    p2name.innerHTML="";
    gameBoardObj.myBoard.length=0;
    gameBoardObj.displayGrid();
    nextTurn.innerHTML="";
}

gameBoardObj.displayGrid();  //Displays initial grid

function computerMoveLogic(p2marker) {
    let myBoard= gameBoardObj.myBoard;   
        if (myBoard[0] != undefined && myBoard[0]===myBoard[1]&&myBoard[2]==undefined){
            myBoard[2]=p2marker;
        }
        else if (myBoard[0] != undefined && myBoard[0]===myBoard[2]&&myBoard[1]==undefined){
            myBoard[1]=p2marker;
        }
        else if (myBoard[2] != undefined && myBoard[1]===myBoard[2]&&myBoard[1]==undefined){
            myBoard[1]=p2marker;
        }
        else if (myBoard[3] != undefined && myBoard[3]===myBoard[4]&&myBoard[5]==undefined){
            myBoard[5]=p2marker;
        }
        else if (myBoard[3] != undefined && myBoard[3]===myBoard[5]&&myBoard[4]==undefined){
            myBoard[4]=p2marker;
        }
        else if (myBoard[4] != undefined && myBoard[4]===myBoard[5]&&myBoard[3]==undefined){
            myBoard[3]=p2marker;
        }   
        else if (myBoard[6] != undefined && myBoard[6]===myBoard[7]&&myBoard[8]==undefined){
            myBoard[8]=p2marker;
        }
        else if (myBoard[6] != undefined && myBoard[6]===myBoard[8]&&myBoard[7]==undefined){
            myBoard[7]=p2marker;
        }
        else if (myBoard[7] != undefined && myBoard[7]===myBoard[8]&&myBoard[6]==undefined){
            myBoard[6]=p2marker;
        }    
        else if (myBoard[0] != undefined && myBoard[0]===myBoard[3]&&myBoard[6]==undefined){
            myBoard[6]=p2marker;
           }
        else if (myBoard[0] != undefined && myBoard[0]===myBoard[6]&&myBoard[3]==undefined){
            myBoard[3]=p2marker;
        }
        else if (myBoard[3] != undefined && myBoard[3]===myBoard[6]&&myBoard[0]==undefined){
            myBoard[0]=p2marker;
        }
        else if (myBoard[1] != undefined && myBoard[1]===myBoard[4]&&myBoard[8]==undefined){
            myBoard[8]=p2marker;
        }
        else if (myBoard[1] != undefined && myBoard[1]===myBoard[8]&&myBoard[4]==undefined){
            myBoard[4]=p2marker;
        }
        else if (myBoard[4] != undefined && myBoard[4]===myBoard[8]&&myBoard[1]==undefined){
            myBoard[1]=p2marker;
        }
        else if (myBoard[2] != undefined && myBoard[2]===myBoard[5]&&myBoard[8]==undefined){
            myBoard[8]=p2marker;
        }
        else if (myBoard[2] != undefined && myBoard[2]===myBoard[8]&&myBoard[5]==undefined){
            myBoard[5]=p2marker;
        }
        else if (myBoard[5] != undefined && myBoard[5]===myBoard[8]&&myBoard[2]==undefined){
            myBoard[2]=p2marker;
        }
        else if (myBoard[0] != undefined && myBoard[0]===myBoard[4]&&myBoard[8]==undefined){
            myBoard[8]=p2marker;
        }
        else if (myBoard[0] != undefined && myBoard[0]===myBoard[8]&&myBoard[4]==undefined){
            myBoard[4]=p2marker;
        }
        else if (myBoard[4] != undefined && myBoard[4]===myBoard[8]&&myBoard[0]==undefined){
            myBoard[0]=p2marker;
        }
        else if (myBoard[2] != undefined && myBoard[2]===myBoard[4]&&myBoard[6]==undefined){
            myBoard[6]=p2marker;
        }
        else if (myBoard[2] != undefined && myBoard[2]===myBoard[6]&&myBoard[4]==undefined){
            myBoard[4]=p2marker;
        }
        else if (myBoard[4] != undefined && myBoard[4]===myBoard[6]&&myBoard[2]==undefined){
            myBoard[2]=p2marker;
        }
       else {
           let x;
           do {           
            x = Math.floor(Math.random()*8);
            } while (myBoard[x]!=undefined);
       myBoard[x]= p2marker;
    };
   };