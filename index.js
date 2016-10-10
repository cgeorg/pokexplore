var fs = require('fs');
var csv = require('to-csv');
var clone = require('clone');
var data = require('./data');
var allPokemon = require('./all');
var calc = require('./calculations');
var {analyze} = require('./analyze');

allPokemon.forEach(p => analyze(p, 40));
fs.writeFileSync('all.csv', csv(allPokemon));

var inv = JSON.parse(fs.readFileSync('inventory.json', 'utf8'));
var pokemon = inv.pokemon;
var trainerLevel = 25;
pokemon = pokemon.filter(p => !p.is_egg);

function cloneEvos(basePoke, evolution, pokeArray) {
    let dex = data.pokeData[evolution],
        pokeClone;
    for (var move1 of dex.QuickMoves) {
        for (var move2 of dex.CinematicMoves) {
            pokeClone = clone(basePoke);
            pokeClone.hypothetical = true;
            pokeClone.pokemon_id = evolution;
            pokeClone.move_1 = move1;
            pokeClone.move_2 = move2;
            pokeArray.push(pokeClone);
        }
    }
    if(dex.Evolution) {
        cloneEvos(pokeClone, dex.Evolution, pokeArray);
    }
}

pokemon.forEach(p => {
    p.hypothetical = false;
    var dex = data.pokeData[p.pokemon_id];
    if (dex.Evolution) {
        if (typeof(dex.Evolution) == 'number') {
            cloneEvos(p, dex.Evolution, pokemon);
        } else {
            for (let evolution of dex.Evolution) {
                cloneEvos(p, evolution, pokemon);
            }
        }
    }
});

pokemon.forEach(p => {
    calc.idsToNames(p);
    calc.stats(p);
    calc.moves(p);
    analyze(p, trainerLevel);
});
pokemon = pokemon.sort((p1, p2) => p2.iv - p1.iv);
fs.writeFileSync('pokemon.csv', csv(pokemon));

