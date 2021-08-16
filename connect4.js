/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

var WIDTH = 7;
var HEIGHT = 6;

var currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])
let colorsMap = new Map([
  [1, "red"],
  [2, "blue"],
]);

/** makeBoard: create in-JS board structure:
 *    board = array of rows, each row is array of cells  (board[y][x])
 */

function makeBoard() {
  // DONE: set "board" to empty HEIGHT x WIDTH matrix array
  board = Array(HEIGHT)
    .fill(0)
    .map(() => Array(WIDTH).fill(0));
}

/** makeHtmlBoard: make HTML table and row of column tops. */

function makeHtmlBoard() {
  // DONE: get "htmlBoard" variable from the item in HTML w/ID of "board"

  let htmlBoard = document.getElementById("board");

  // DONE: add comment for this code
  /* 
    The top varible is made for input and is placed on top of the board which is made below
  */
  var top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // DONE: add comment for this code
  /*
    These two loops create a table that will be the visual container for our pieces
  */
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

/** findSpotForCol: given column x, return top empty y (null if filled) */

function findSpotForCol(x) {
  // DONE: write the real version of this, rather than always returning 0
  /*
  We reverse the array here so when we iterate it we go from bottom to top instead of top to bottom so when we find an open spot in x its the closest to the bottom
  That way we dont have to iterate through the entire array then back track when we find a piece
  */
  let reversedArray = [...board];
  reversedArray.reverse();
  for (let y = 0; y < reversedArray.length; y++) {
    if (reversedArray[y][x] == 0) {
      return reversedArray.length - y - 1;
    }
  }
  return board.length - 1;
}

/** placeInTable: update DOM to place piece into HTML table of board */

function placeInTable(y, x) {
  // DONE: make a div and insert into correct table cell
  let Item = document.getElementById(`${y}-${x}`);
  let piece = document.createElement("div");
  piece.classList.add("piece");
  piece.classList.add(`${colorsMap.get(currPlayer)}`);
  Item.append(piece);
}

/** endGame: announce game end */

function endGame(msg) {
  // DONE: pop up alert message
  alert(msg);
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {
  // get x from ID of clicked cell
  let x = +evt.target.id;

  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  if (y === null) {
    return;
  }

  // place piece in board and add to HTML table
  // DONE: add line to update in-memory board
  board[y][x] = currPlayer;
  placeInTable(y, x);

  // check for win
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
  }

  // check for tie
  // DONE: check if all cells in board are filled; if so call, call endGame
  if (board[0].indexOf(0) == -1) {
    endGame("Tie Game");
  }
  // switch players
  // DONE: switch currPlayer 1 <-> 2
  changePlayer();
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // DONE: read and understand this code. Add comments to help you.
  /*
    Below is 4 win cons and we compare the array of arrays given through the loop and placed into the win con check positions
    then we send the check positions through _win -> cells.every() to check if all posistions are from the same player and are in legal bounds
    if the _win function returns true on any of the check positions then we know that we have a winner
  */

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [
        [y, x],
        [y, x + 1],
        [y, x + 2],
        [y, x + 3],
      ];
      var vert = [
        [y, x],
        [y + 1, x],
        [y + 2, x],
        [y + 3, x],
      ];
      var diagDR = [
        [y, x],
        [y + 1, x + 1],
        [y + 2, x + 2],
        [y + 3, x + 3],
      ];
      var diagDL = [
        [y, x],
        [y + 1, x - 1],
        [y + 2, x - 2],
        [y + 3, x - 3],
      ];

      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
}

function changePlayer() {
  currPlayer == 1 ? (currPlayer = 2) : (currPlayer = 1);
}

makeBoard();
makeHtmlBoard();