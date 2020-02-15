'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


class checker {
  constructor(color)
  {
  this.symbol = color;
  }
}

// const Checker = (color) => {
//   if(color === 'w'){
//     checker.symbol = "0";
//     // String.fromCharCode(0x125CB); //WHITE
//   } else { 
//     checker.symbol = "X";
//      // String.fromCharCode(0x125CF); //BLACK
//   }
//   return checker;
// };

class Board {
  constructor() {
    this.grid = []
    this.checkers = []  //NOT SURE ABOUT THIS
  }
  // method that creates an 8x8 array, filled with null values
  createGrid() {
    // loop to create the 8 rows
    for (let row = 0; row < 8; row++) {
      this.grid[row] = [];
      // push in 8 columns of nulls
      for (let column = 0; column < 8; column++) {
        this.grid[row].push(null);
      }
    }
  }
  viewGrid() {
    // add our column numbers
    let string = "  0 1 2 3 4 5 6 7\n";
    for (let row = 0; row < 8; row++) {
      // we start with our row number in our array
      const rowOfCheckers = [row];
      // a loop within a loop
      for (let column = 0; column < 8; column++) {
        // if the location is "truthy" (contains a checker piece, in this case)
        if (this.grid[row][column]) {
          // push the symbol of the check in that location into the array
          rowOfCheckers.push(this.grid[row][column].symbol);
        } else {
          // just push in a blank space
          rowOfCheckers.push(' ');
        }
      }
      // join the rowOfCheckers array to a string, separated by a space
      string += rowOfCheckers.join(' ');
      // add a 'new line'
      string += "\n";
    }
    console.log(string);
  }

  // Your code heres


// Instantiate a 'white' Checker
// Place that checker on the grid 
// at the position corresponding with the index in the positions array
// Push the checker into your this.checkers array

  createCheckers() {
    var whitePositions = [
      [0, 1], [0, 3], [0, 5], [0, 7],
      [1, 0], [1, 2], [1, 4], [1, 6],
      [2, 1], [2, 3], [2, 5], [2, 7]];

    var blackPositions = [
      [5, 0], [5, 2], [5, 4], [5, 6],
      [6, 1], [6, 3], [6, 5], [6, 7],
      [7, 0], [7, 2], [7, 4], [7, 6]];

    for (let w of whitePositions){
      let wChecker = new checker(String.fromCharCode(0x125CB));
      this.grid[w[0]][w[1]] = wChecker;
      this.checkers.push(wChecker);
    }

    for (const b of blackPositions){
      let bChecker = new checker(String.fromCharCode(0x125CF));
      this.grid[b[0]][b[1]] = bChecker;
      this.checkers.push(bChecker);
    }
  }

  // method this.selectChecker that takes 
  // two arguments row, column. 
  // All this does is return the checker at that particular spot on this.grid.

  selectChecker(row,column){
    return this.grid[row][column]; // returning the object?
  }


  killChecker(position){
    // let checker = this.board.selectChecker(position[0],position[1]);

    // Find the index of that checker in the this.checkers array. then remove it by .splice()ing it out
    let killIndex = this.checkers.indexOf(checker);
    this.checkers.splice(killIndex,1);
    this.grid[position[0]][position[1]] = null;
  }
}

class Game {
  constructor() {
    this.board = new Board;
  }
  start() {
    this.board.createGrid();
    this.board.createCheckers();
  }
  

  // this.moveChecker method that takes two parameters start, end. 
  // These two arguments will each contain a row and a column, 
  // Inside the method
  //    use your board helper method selectChecker to select the checker at your //    starting rowcolumncoordinates 
  //    and set it to a local variable checker. 
  // Then set that spot on the grid to null and set the spot 
  //    at the end rowcolumn coordinate to the checker.
  moveChecker(start, end){
    let startSplit = start.split("");
    let endSplit = end.split("");
    let startRow = parseInt(startSplit[0]);
    let startCol = parseInt(startSplit[1]);
    let endRow = parseInt(endSplit[0]);
    let endCol = parseInt(endSplit[1]);
  
    // This will be the Mark the new board posistion
    let checker = this.board.selectChecker(startRow,startCol);

    // Set the spot.
    this.board.grid[endRow][endCol] = checker;

    // This will null Start lcoation
    this.board.grid[startRow][startCol]=null;

     if (Math.abs(startRow - endRow) === 2){
      let killRow = (startRow + endRow) / 2;
      let killCol = (startCol + endCol) / 2;
      let killPostition = [killRow,killCol];  
      this.board.killChecker(killPostition);    
    } 
    
  }
}

function getPrompt() {
  game.board.viewGrid();
  rl.question('which piece?: ', (whichPiece) => {
    rl.question('to where?: ', (toWhere) => {
      game.moveChecker(whichPiece, toWhere);
      getPrompt();
    });
  });
}

const game = new Game();
game.start();


// Tests
if (typeof describe === 'function') {
  describe('Game', () => {
    it('should have a board', () => {
      assert.equal(game.board.constructor.name, 'Board');
    });
    it('board should have 24 checkers', () => {
      assert.equal(game.board.checkers.length, 24);
    });
  });

  describe('Game.moveChecker()', () => {
    it('should move a checker', () => {
      assert(!game.board.grid[4][1]);
      game.moveChecker('50', '41');
      assert(game.board.grid[4][1]);
      game.moveChecker('21', '30');
      assert(game.board.grid[3][0]);
      game.moveChecker('52', '43');
      assert(game.board.grid[4][3]);
    });
    it('should be able to jump over and kill another checker', () => {
      game.moveChecker('30', '52');
      assert(game.board.grid[5][2]);
      assert(!game.board.grid[4][1]);
      assert.equal(game.board.checkers.length, 23);
    });
  });
} else {
  getPrompt();
}
