const allPokemon = require('./all');

let bestAttack,
    bestDefense;

for (let pokemon of allPokemon) {
    if (!bestAttack) {
        bestAttack = bestDefense = pokemon;
    } else {
        if (Math.max(pokemon.move1MovePps, pokemon.movesMovePps) > Math.max(bestAttack.move1MovePps, bestAttack.movesMovePps)) {
            bestAttack = pokemon;
        }
        if (Math.max(pokemon.move1MoveDefPps, pokemon.movesMoveDefPps) > Math.max(bestDefense.move1MoveDefPps, bestDefense.movesMoveDefPps)) {
            bestDefense = pokemon;
        }
    }
}

module.exports = {
    bestAttack, bestDefense
};