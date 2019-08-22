export default {
  createGame(base, numberOfPlayers, gamekey) {
    //Total squares of the game board
    const totalSquares = base * base;

    // This function will return an array of player objects
    const createPlayers = numberOfPlayers => {
      const players = [];
      // For each player, we'll create a new object,
      // with a "position" property of "1" and a "number"
      // property that will be their player number
      for (let i = 0; i < numberOfPlayers; i++) {
        players.push({
          position: 1,
          number: i + 1
        });
      }
      return players;
    };

    // This function will return an object
    // with each square object from the game board
    // and with each special square
    const createBoard = base => {
      let squares = [];

      // The first square is the "start" square.
      // The second one is unreachable, as we're playing with two dices.
      // The last one is the "goal" square.
      // We will find the other special squares later.
      let specialSquares = [1, 2, totalSquares];

      // Now, let's fill the "squares" array with objects
      for (let i = 1; i <= totalSquares; i++) {
        squares.push({
          number: i,
          // if this is the last square, let's mark it
          // as the 'goal' square.
          type: i === totalSquares ? "goal" : ""
        });
      }

      // This functions return a random number, based on the
      // number of squares in the board. If we choose another number
      // to compare, we must also define if we want a higher or
      // lower number.
      const chooseRandomSquare = (higherOrLower, numberToCompare) => {
        // Find a random square
        let specialSquare = Math.floor(Math.random() * totalSquares) + 1;

        // If we're comparing, then we must see if there's an available
        // number to choose from.
        if (higherOrLower) {
          let compareArray, numberToShift;

          // If we're looking for a lower number, then we'll create a array with
          // all numbers that are lower than the number we're comparing with,
          // if its higher, we're doing the oposite.
          if (higherOrLower === "lower") {
            // First we create a array with enough empty slots
            // using Array(N)
            compareArray = Array(numberToCompare - 1);
            numberToShift = 0;
          } else {
            compareArray = Array(totalSquares - numberToCompare);
            numberToShift = numberToCompare;
          }
          compareArray
            .fill()
            // Then we fill each empty slot with the right numbers
            .map((v, i) => i + 1 + numberToShift);

          // Lastly, if every number was already chosen, return false,
          // forcing to discard the first number.
          if (compareArray.every(item => specialSquares.includes(item))) {
            return false;
          }
        }

        // If there's a chance to choose a number, but the number was already chosen,
        // we just try it again.
        if (specialSquares.includes(specialSquare)) {
          return chooseRandomSquare(higherOrLower, numberToCompare);
        }
        // If we're looking for a higher/lower square, and the number fit that
        // requirement, OR if we're just choosing a number without comparison,
        // return that number
        if (
          (higherOrLower === "higher" && specialSquare > numberToCompare) ||
          (higherOrLower === "lower" && specialSquare < numberToCompare) ||
          !higherOrLower
        ) {
          return specialSquare;
        }
        // Else (this mean the 'higher/lower' requirement was not fit),
        // try another number.
        else {
          return chooseRandomSquare(higherOrLower, numberToCompare);
        }
      };

      // This function create a special square, that will have a
      // "from" property, and a "to" property. We must choose if this
      // square will be a square that will move players "higher" or
      // "lower" on the game board.
      const createSpecialSquare = higherOrLower => {
        // We first select a random number;
        let firstNumber = chooseRandomSquare();
        // Then create a second number, using the first one as comparison
        let secondNumber = chooseRandomSquare(higherOrLower, firstNumber);

        // If the chooseRandomSquare returned false, the first number chosen
        // made the second selection impossible. So we have to choose a
        // new first number.
        if (!secondNumber) {
          createSpecialSquare(higherOrLower);
        } else {
          // If evertything worked, we add both numbers to our specialSquares array
          // and then we modify the square array to have a new object with the "from"
          // and "to" properties, and its "type" (higher/lower).
          specialSquares = [firstNumber, secondNumber, ...specialSquares];
          squares = squares.map(item =>
            item.number === firstNumber
              ? {
                  ...item,
                  from: firstNumber,
                  to: secondNumber,
                  type: higherOrLower
                }
              : item
          );
        }
      };
      // Almost there! Now we just create enough special squares to the board
      for (let i = 0; i < Math.floor(base / 2); i++) {
        createSpecialSquare("higher");
        createSpecialSquare("lower");
      }
      // And we return the object containing the two arrays.
      return {
        squares,
        specialSquares
      };
    };

    // Our game object, with the fixed and dynamic properties.
    return {
      numberOfPlayers,
      base,
      totalSquares,
      gamekey,
      players: createPlayers(numberOfPlayers),
      // I am using this solution to generate a random string:
      // https://stackoverflow.com/a/8084248/2887613
      // Because is really short and I'm not worried about creating
      // more than 50.000 games for this tutorial.
      gameId: Math.random()
        .toString(36)
        .substring(2, 7),
      winner: false,
      turn: 0,
      board: createBoard(base),
      dice: {
        locked: false,
        dice1: 1,
        dice2: 1
      }
    };
  },

  playTurn(gameData, player, localCallback, serverCallback) {
    let game = gameData.state;
    const defs = gameData.defs;
    game.walked = game.dice.dice1 + game.dice.dice2;
    const nextTurn = () => {
      game.dice.locked = false;
      game.turn++;
      serverCallback(game);
    };
    const checkPosition = player => {
      let specialPositions = game.board.squares.map(item => item.from);
      if (specialPositions.includes(game.players[player].position)) {
        let rule = game.board.squares.filter(
          item => item.from === game.players[player].position
        );
        game.players[player].position = rule[0].to;
      }
      if (game.players[player].position === game.totalSquares) {
        game.winner = (game.turn % game.numberOfPlayers) + 1;
        serverCallback(game);
        return false;
      }
      nextTurn();
    };
    const walkForward = player => {
      const walk = () => {
        if (game.walked > 0) {
          game.players[player].position++;
          if (game.players[player].position > game.totalSquares) {
            game.players[player].position--;
            bounceBack(player);
          } else {
            game.walked--;
            localCallback(game);
            setTimeout(walk, defs.transitionTime);
          }
        } else {
          checkPosition(player);
        }
      };
      walk();
    };
    const bounceBack = player => {
      const bounce = () => {
        if (game.walked > 0) {
          game.players[player].position--;
          game.walked--;
          localCallback(game);
          setTimeout(bounce, defs.transitionTime);
        } else {
          checkPosition(player);
        }
      };
      bounce();
    };
    walkForward(player);
  }
};
