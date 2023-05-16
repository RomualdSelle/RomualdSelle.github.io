var Etatjeu = new Array();
var iaStarts = false;
var cells = document.getElementsByClassName("cell");
var iaScore = 0;
var iaScoreDisplay = document.getElementById("iaScore");

function remainingMoves(list) {
    var remaining = new Array();
    for (i = 0; i < 9; i++) {
        if (list.indexOf(i) == -1) {
            remaining.push(i);
        }
    }
    return remaining;
}

function nextGameStates(list) {
    var nextStates = new Array();
    remaining = remainingMoves(list);
    for (i = 0; i < remaining.length; i++) {
        nextStates.push([remaining[i]]);
    }
    for (i = 0; i < remaining.length; i++) {
        nextStates[i] = list.concat(nextStates[i]);
    }
    return nextStates;
}

function hasWon(list) {
    var board = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var player = (list.length + 1) % 2;
    for (i = player; i < list.length; i = i + 2) {
        board[list[i]] = 1;
    }
    if (
        (board[0] == 1 && board[1] == 1 && board[2] == 1) ||
        (board[3] == 1 && board[4] == 1 && board[5] == 1) ||
        (board[6] == 1 && board[7] == 1 && board[8] == 1) ||
        (board[0] == 1 && board[3] == 1 && board[6] == 1) ||
        (board[1] == 1 && board[4] == 1 && board[7] == 1) ||
        (board[2] == 1 && board[5] == 1 && board[8] == 1) ||
        (board[0] == 1 && board[4] == 1 && board[8] == 1) ||
        (board[2] == 1 && board[4] == 1 && board[6] == 1)
    ) {
        return 1;
    } else {
        return 0;
    }
}

function bestMove(list, depth) {
    if (depth == 0) {
        threshold = remainingMoves(list).length - 1;
    }
    var maxStrength = Math.pow(-1, depth + 1);
    var Strength;
    var move = 9;
    var i;
    for (i = 0; i < 9 - list.length; i++) {
        if (depth % 2 == 0) {
            Strength = hasWon(nextGameStates(list)[i]);
            if (Strength == 1) {
                return [Strength, remainingMoves(list)[i]];
            } else {
                if (depth < threshold) {
                    Strength = bestMove(nextGameStates(list)[i], depth + 1)[0];
                    if (Strength > maxStrength) {
                        maxStrength = Strength;
                        move = remainingMoves(list)[i];
                    }
                } else {
                    return [hasWon(list), remainingMoves(list)[0]];
                 }
            }
        }
        if (depth % 2 == 1) {
            Strength = -1 * hasWon(nextGameStates(list)[i]);
            if (Strength == -1) {
                return [Strength, remainingMoves(list)[i]];
            } else {
                if (depth < threshold) {
                    Strength = bestMove(nextGameStates(list)[i], depth + 1)[0];
                    if (Strength < maxStrength) {
                        maxStrength = Strength;
                        move = remainingMoves(list)[i];
                    }
                } else {
                    return [hasWon(list), remainingMoves(list)[0]];
                }
            }
        }
    }
    return [maxStrength, move];
}

function matchNul(list) {
    return list.length === 9 && hasWon(list) === 0;
}

function aGagneJoueur(list, joueur) {
    var board = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    for (i = joueur; i < list.length; i += 2) {
        board[list[i]] = 1;
    }

    var conditionsDeVictoire = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    var winningIndices = null;
    conditionsDeVictoire.some(function (condition) {
        if (condition.every(function (index) { return board[index] === 1; })) {
            winningIndices = condition;
            return true;
        }
        return false;
    });

    return winningIndices;
}

function checkGameOver() {
    var winningIndices = aGagneJoueur(Etatjeu, 0) || aGagneJoueur(Etatjeu, 1);

    if (winningIndices) {
        winningIndices.forEach(function (index) {
            cells[index].classList.add("blink");
        });
        iaScore++;
        iaScoreDisplay.textContent = iaScore;
        gameOver();
    } else if (matchNul(Etatjeu)) {
        gameOver();
    }
}

function play(cell) {
    var index = Array.from(cells).indexOf(cell);
    if (Etatjeu.indexOf(index) === -1) {
        Etatjeu.push(index);
        cell.textContent = "ᝣ";
        checkGameOver();
        if (Etatjeu.length < 9) {
            var iaMove = bestMove(Etatjeu, 0)[1];
            Etatjeu.push(iaMove);
            cells[iaMove].textContent = "ᝪ";
            checkGameOver();
        }
    }
}

function gameOver() {
    for (let cell of cells) {
        cell.removeEventListener("click", clickHandler);
    }
    setTimeout(resetGame, 1000);
}

function clickHandler(event) {
    play(event.target);
}

function resetGame() {
    for (let cell of cells) {
        cell.textContent = "";
        cell.classList.remove("blink");
        cell.addEventListener("click", clickHandler);
    }
    Etatjeu = [];
    iaStarts = !iaStarts;
    if (iaStarts) {
        const random = [0, 2, 6, 8]
        var iaMove = random[Math.floor(Math.random() * random.length)];
        Etatjeu.push(iaMove);
        cells[iaMove].textContent = "ᝪ";
    }
}

for (let cell of cells) {
    cell.addEventListener("click", clickHandler);
}
