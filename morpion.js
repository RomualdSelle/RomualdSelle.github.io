var Etatjeu = new Array();
var iaStarts = false;
var cells = document.getElementsByClassName("cell");
var playerScore = 0;
var iaScore = 0;
var iaScoreDisplay = document.getElementById("iaScore");
var playerScoreDisplay = document.getElementById("playerScore");

function ListeReste(liste) {
    var Reste = new Array();
    for (i = 0; i < 9; i++) {
        if (liste.indexOf(i) == -1) {
            Reste.push(i);
        }
    }
    return Reste;
}

function ListeFils(liste) {
    var Fils = new Array();
    Reste = ListeReste(liste);
    for (i = 0; i < Reste.length; i++) {
        Fils.push([Reste[i]]);
    }
    for (i = 0; i < Reste.length; i++) {
        Fils[i] = liste.concat(Fils[i]);
    }
    return Fils;
}

function Victoire(liste) {
    var l = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    var n = (liste.length + 1) % 2;
    for (i = n; i < liste.length; i = i + 2) {
        l[liste[i]] = 1;
    }
    if (
        (l[0] == 1 && l[1] == 1 && l[2] == 1) ||
        (l[3] == 1 && l[4] == 1 && l[5] == 1) ||
        (l[6] == 1 && l[7] == 1 && l[8] == 1) ||
        (l[0] == 1 && l[3] == 1 && l[6] == 1) ||
        (l[1] == 1 && l[4] == 1 && l[7] == 1) ||
        (l[2] == 1 && l[5] == 1 && l[8] == 1) ||
        (l[0] == 1 && l[4] == 1 && l[8] == 1) ||
        (l[2] == 1 && l[4] == 1 && l[6] == 1)
    ) {
        return 1;
    } else {
        return 0;
    }
}

function MeilleurCoup(liste, niveau) {
    if (niveau == 0) {
        seuil = ListeReste(liste).length - 1;
    }
    var Force = Math.pow(-1, niveau + 1);
    var force;
    var Coup = 9;
    var coup = 700;
    var i;
    for (i = 0; i < 9 - liste.length; i++) {
        if (niveau % 2 == 0) {
            force = Victoire(ListeFils(liste)[i]);
            if (force == 1) {
                return [force, ListeReste(liste)[i]];
            } else {
                if (niveau < seuil) {
                    force = MeilleurCoup(ListeFils(liste)[i], niveau + 1)[0];
                    if (force > Force) {
                        Force = force;
                        Coup = ListeReste(liste)[i];
                    }
                } else {
                    return [Victoire(liste), ListeReste(liste)[0]];
                 }
            }
        }
        if (niveau % 2 == 1) {
            force = -1 * Victoire(ListeFils(liste)[i]);
            if (force == -1) {
                return [force, ListeReste(liste)[i]];
            } else {
                if (niveau < seuil) {
                    force = MeilleurCoup(ListeFils(liste)[i], niveau + 1)[0];
                    if (force < Force) {
                        Force = force;
                        Coup = ListeReste(liste)[i];
                    }
                } else {
                    return [Victoire(liste), ListeReste(liste)[0]];
                }
            }
        }
    }
    return [Force, Coup];
}

function matchNul(liste) {
    return liste.length === 9 && Victoire(liste) === 0;
}

function aGagneJoueur(liste, joueur) {
    var l = new Array(0, 0, 0, 0, 0, 0, 0, 0, 0);
    for (i = joueur; i < liste.length; i += 2) {
        l[liste[i]] = 1;
    }

    var conditionsDeVictoire = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    var winningIndices = null;
    conditionsDeVictoire.some(function (condition) {
        if (condition.every(function (index) { return l[index] === 1; })) {
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
        cell.textContent = "X";
        checkGameOver();
        if (Etatjeu.length < 9) {
            var iaMove = MeilleurCoup(Etatjeu, 0)[1];
            Etatjeu.push(iaMove);
            cells[iaMove].textContent = "O";
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
        cell.classList.remove("blink"); // Ajoutez cette ligne
        cell.addEventListener("click", clickHandler);
    }
    Etatjeu = [];
    iaStarts = !iaStarts;
    if (iaStarts) {
        var iaMove = MeilleurCoup(Etatjeu, 0)[1];
        Etatjeu.push(iaMove);
        cells[iaMove].textContent = "O";
    }
}

for (let cell of cells) {
    cell.addEventListener("click", clickHandler);
}