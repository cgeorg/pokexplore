const fs = require('fs');
const csv = require('to-csv');
const clone = require('clone');
const calc = require('./calculations');
const data = require('./data');

let all = [];
for(let pokeId in data.pokeData) {
    let poke = data.pokeData[pokeId];
    let pokemon = {
        pokemon_id: poke.ID,
        deployed_fort_id: '',
        owner_name: '',
        is_egg: false,
        egg_km_walked_target: 0,
        egg_km_walked_start: 0,
        origin: 0,
        height_m: poke.Height,
        weight_kg: poke.Weight,
        individual_attack: 15,
        individual_defense: 15,
        individual_stamina: 15,
        cp_multiplier: data.multForLevel(40),
        pokeball: 1,
        captured_cell_id: '',
        battles_attacked: 0,
        battles_defended: 0,
        egg_incubator_id: '',
        creation_time_ms: 0,
        num_upgrades: 0,
        additional_cp_multiplier: 0,
        favorite: 0,
        nickname: '',
        from_fort: 0,
        buddy_candy_awarded: 0
    };
    //calc cp
    //calc hp

    pokemon.stamina_max = pokemon.stamina = Math.floor((poke.BaseStamina + 15) * pokemon.cp_multiplier);
    calc.stats(pokemon, 40);
    for(let move1 of poke.QuickMoves) {
        for(let move2 of poke.CinematicMoves) {
            let pokeClone = clone(pokemon);
            pokeClone.move_1 = move1;
            pokeClone.move_2 = move2;
            calc.idsToNames(pokeClone);
            calc.moves(pokeClone);
            all.push(pokeClone);
        }
    }
}
module.exports = all;