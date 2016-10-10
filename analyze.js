var {maxAttack, maxDefense, maxStamina, multForLevel} = require('./data');
var {bestAttack, bestDefense} = require('./best');
var {cp, defCp} = require('./calculations');

function analyze(pokemon, trainerLevel) {
    pokemon.iv = pokemon.individual_attack + pokemon.individual_defense + pokemon.individual_stamina;
    pokemon.ivPct = pokemon.iv / 45;
    pokemon.weightedIvPct = (pokemon.iv + pokemon.individual_attack) / 60;

    pokemon.attackRating = pokemon.attack / maxAttack * 100;
    pokemon.defenseRating = pokemon.defense / maxDefense * 100;
    pokemon.staminaRating = pokemon.stamina / maxStamina * 100;

    pokemon.cp = cp(pokemon.attack, pokemon.defense, pokemon.stamina, pokemon.actual_cp_multiplier);
    pokemon.def_cp = defCp(pokemon.attack, pokemon.defense, pokemon.stamina, pokemon.actual_cp_multiplier);

    pokemon.attackPower = Math.max(pokemon.movesMovePps, pokemon.move1MovePps) /
        Math.max(bestAttack.movesMovePps, bestAttack.move1MovePps) *
        pokemon.cp;

    pokemon.defensePower = Math.max(pokemon.movesMoveDefPps, pokemon.move1MoveDefPps) /
        Math.max(bestDefense.movesMoveDefPps, bestDefense.move1MoveDefPps) *
        pokemon.def_cp;

    pokemon.attackPowerPotential = Math.max(pokemon.movesMovePps, pokemon.move1MovePps) /
        Math.max(bestAttack.movesMovePps, bestAttack.move1MovePps) *
        cp(pokemon.attack, pokemon.defense, pokemon.stamina, multForLevel(trainerLevel));

    pokemon.defensePowerPotential = Math.max(pokemon.movesMoveDefPps, pokemon.move1MoveDefPps) /
        Math.max(bestDefense.movesMoveDefPps, bestDefense.move1MoveDefPps) *
        defCp(pokemon.attack, pokemon.defense, pokemon.stamina, multForLevel(trainerLevel));
}

module.exports = {analyze};