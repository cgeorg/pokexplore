var {pokeData, moveData, level} = require('./data');

function idsToNames(pokemon) {
    pokemon.type = pokeData[pokemon.pokemon_id].Name;

    pokemon.move_1_name = moveData[pokemon.move_1].Name;
    pokemon.move_2_name = moveData[pokemon.move_2].Name;
    pokemon.actual_cp_multiplier = pokemon.cp_multiplier + pokemon.additional_cp_multiplier;
}

function moves(pokemon) {
    var move1 = moveData[pokemon.move_1];
    var move2 = moveData[pokemon.move_2];

    pokemon.move1MovePps = 1000 * (move1.Power || 0) / move1.Duration;
    pokemon.move2MovePps = 1000 * move2.Power / move2.Duration;

    pokemon.move1MaxPps = pokemon.attack * pokemon.move1MovePps;
    pokemon.move2MaxPps = pokemon.attack * pokemon.move2MovePps;

    pokemon.move1Pps = pokemon.move1MaxPps * pokemon.actual_cp_multiplier;
    pokemon.move2Pps = pokemon.move2MaxPps * pokemon.actual_cp_multiplier;

    // Pps when both used together
    var numMovesForCharge = move2.EnergyDelta * -1 / move1.EnergyDelta;
    var combinedTime = numMovesForCharge * move1.Duration + move2.Duration;
    var combinedPower = numMovesForCharge * (move1.Power || 0) + move2.Power;

    pokemon.movesMovePps = combinedPower / combinedTime * 1000;
    pokemon.movesMaxPps = pokemon.attack * pokemon.movesMovePps;
    pokemon.movesPps = pokemon.movesMaxPps * pokemon.actual_cp_multiplier;

    //Now with defensive timings

    pokemon.move1MoveDefPps = 1000 * (move1.Power || 0) / (move1.Duration + 2500);
    pokemon.move2MoveDefPps = 1000 * move2.Power / (move2.Duration + 2500);

    pokemon.move1MaxDefPps = pokemon.attack * pokemon.move1MoveDefPps;
    pokemon.move2MaxDefPps = pokemon.attack * pokemon.move2MoveDefPps;

    pokemon.move1DefPps = pokemon.move1MaxDefPps * pokemon.actual_cp_multiplier;
    pokemon.move2DefPps = pokemon.move2MaxDefPps * pokemon.actual_cp_multiplier;

    // Pps when both used together
    combinedTime = numMovesForCharge * (move1.Duration + 2500) + move2.Duration + 2500;
    combinedPower = numMovesForCharge * (move1.Power || 0) + move2.Power;

    pokemon.movesMoveDefPps = combinedPower / combinedTime * 1000;
    pokemon.movesMaxDefPps = pokemon.attack * pokemon.movesMoveDefPps;
    pokemon.movesDefPps = pokemon.movesMaxDefPps * pokemon.actual_cp_multiplier;
}

function stats(pokemon) {
    var dex = pokeData[pokemon.pokemon_id];

    pokemon.level = level(pokemon.actual_cp_multiplier);

    pokemon.attack = pokemon.individual_attack + dex.BaseAttack;
    pokemon.defense = pokemon.individual_defense + dex.BaseDefense;
    pokemon.stamina = pokemon.individual_stamina + dex.BaseStamina;
}

function cp(attack, defense, stamina, mult) {
    return Math.floor(attack * Math.sqrt(stamina) * Math.sqrt(defense) * mult*mult / 10);
}

function defCp(attack, defense, stamina, mult) {
    return Math.floor(stamina * Math.sqrt(attack) * Math.sqrt(defense) * mult*mult / 10);
}

module.exports = {idsToNames, moves, stats, cp, defCp};