// const restartBtn = document.querySelector(".restart-btn");
// restartBtn.addEventListener("click",(e)=>{
//     let i;
//         for (i=0; i<=8; i++) { 
//             delete gameBoardObj.myBoard[i];
//         }
//     playGame();
// })


const newGameBtn = document.querySelector(".newGame-btn");
const nameBtn = document.getElementById("sendNames-btn");
const nameInput1= document.getElementById("player-name1");
const nameInput2= document.getElementById("player-name2");
const form = document.querySelector(".form-container");

newGameBtn.addEventListener("click",(e)=>{      //Shows player name input form
    form.style.display="block";
    });

form.addEventListener("submit",(e)=>{
   // debugger;
    e.preventDefault();
    newGame()
}); 


//Full gameplay - incl turns, player names


//*****************   FROM HERE   ************** */

const gameBoardObj = {
    myBoard: [],
    displayGrid (){
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

        row1.className="row";
        row2.className="row";
        row3.className="row";

        while(gameBoard.firstChild){
            gameBoard.removeChild(gameBoard.firstChild);
        }

        gameBoard.appendChild(row1);
            row1.appendChild(square0);
            row1.appendChild(square1);
            row1.appendChild(square2);
        gameBoard.appendChild(row2);
            row2.appendChild(square3);
            row2.appendChild(square4);
            row2.appendChild(square5);
        gameBoard.appendChild(row3);
            row3.appendChild(square6);
            row3.appendChild(square7);
            row3.appendChild(square8);

        const square = document.querySelectorAll(".square");
        let i=0;
        Array.from(square).forEach((item)=> { 
            item.textContent= gameBoardObj.myBoard[i];
            i++;
            }
        )
    },
    setClickEvent(player,playerObjects){
        const square = document.querySelectorAll(".square");
        Array.from(square).forEach(function(square) {
            square.addEventListener("click",(e) => {
                    let arrayMarker = e.target.dataset.square;     
                    if (gameBoardObj.myBoard[arrayMarker]==undefined) {  
                        // console.log(player);
                        // console.log(playerObjects);                
                        square.textContent=player.marker;  
                        gameBoardObj.myBoard[arrayMarker]=player.marker;                             
                        if (gameObj.checkWin(playerObjects) || gameObj.checkTie()) {
                            gameBoardObj.displayGrid();
                            console.log("GAME ENDS");
                            return;
                        }
                        else playGame(playerObjects);
                        }; 
                    })
                })
        }    
    };

const gameObj = {
    turnCounter:0,
        setTurn (playerObjects) {
            let player1=playerObjects.player1;
            let player2=playerObjects.player2;

        function myTurn(player1, player2) {
            gameObj.turnCounter++;
            console.log(`TurnCounter = ${gameObj.turnCounter}`)
            let nextPlayer;           
            if (gameObj.turnCounter%2!=0) {
                nextPlayer = player1;
            }
            else {
                nextPlayer = player2;
             }
            return nextPlayer;            //Returns next player
        };
        return myTurn(player1, player2);  //This is where the players are returned
    },

    printWinner(marker, players) {
        debugger;
        // console.log(marker);
        // console.log(players);
        if (marker == players.player1.marker){
            console.log(players.player1.name+ " wins!");
            return true;
        }
        else console.log(players.player2.name+ " wins!")
        return true;
    },  

    checkWin(playerObjects) {
// debugger;
        let players = playerObjects;
        let myBoard= gameBoardObj.myBoard;

        // if (myBoard[0] !== undefined && myBoard[0]===myBoard[1]){
        //     let marker = myBoard[0];
        //     this.printWinner(marker,players);
        //     return true;
        // }


//REAL 9-SQAURE VERSION        
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
        //debugger;
        let i;
        for (i=0; i<=8; i++) {  
                if (gameBoardObj.myBoard[i] == undefined) {  
                    console.log(`Square ${i} = ${gameBoardObj.myBoard[i]}`);
                return false;
                }
            }    
            console.log(gameBoardObj.myBoard[i]);
        console.log("It's a draw!");
        return true;
    },
}
    function Player(name,marker) {  
        return {name, marker};
    };
    function getNames() {               
        const playerName1 = nameInput1.value;
        const playerName2 = nameInput2.value;
        const player1 = Player(playerName1, "0");
        const player2 = Player(playerName2, "X");
        nameInput1.value = "";
        nameInput2.value = "";
        form.style.display="none";
        // console.log(player1 + player2);
        return {player1, player2};
    };


function playGame (playerObjects) {
    gameBoardObj.displayGrid();
    // debugger;
    console.log(playerObjects);
    let nextPlayer = gameObj.setTurn(playerObjects);          //Passes players 1 and 2 to setTurn
    gameBoardObj.setClickEvent(nextPlayer,playerObjects);      //Passes next player
};

function newGame () {
    let playerObjects = getNames();
    gameBoardObj.displayGrid();
    let nextPlayer = gameObj.setTurn(playerObjects);          //Passes players 1 and 2 to setTurn
    gameBoardObj.setClickEvent(nextPlayer,playerObjects);      //Passes next player
};

gameBoardObj.displayGrid();  //Displays initial grid