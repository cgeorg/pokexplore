var fs = require('fs');
var pokeData = JSON.parse(fs.readFileSync('GAME_DATA_POKEMON.json', 'utf8'));
var moveData = JSON.parse(fs.readFileSync('GAME_DATA_MOVES.json', 'utf8'));

pokeData = pokeData.filter(poke => poke.ID < 150);

var maxAttack = pokeData.reduce((atk, poke) => Math.max(poke.BaseAttack + 15, atk), 0);
var maxDefense = pokeData.reduce((def, poke) => Math.max(poke.BaseDefense + 15, def), 0);
var maxStamina = pokeData.reduce((stam, poke) => Math.max(poke.BaseStamina + 15, stam), 0);
var maxCP = pokeData.reduce((cp, poke) => Math.max(poke.MaxCP, cp), 0);

pokeData = pokeData.reduce((obj, data) => {
    obj[data.ID] = data;
    return obj;
}, {});

moveData = moveData.reduce((obj, data) => {
    obj[data.ID] = data;
    return obj;
}, {});

var levels = [ 0.094     ,  0.16639787,  0.21573247,  0.25572005,  0.29024988,
        0.3210876 ,  0.34921268,  0.37523559,  0.39956728,  0.42250001,
        0.44310755,  0.46279839,  0.48168495,  0.49985844,  0.51739395,
        0.53435433,  0.55079269,  0.56675452,  0.58227891,  0.59740001,
        0.61215729,  0.62656713,  0.64065295,  0.65443563,  0.667934  ,
        0.68116492,  0.69414365,  0.70688421,  0.71939909,  0.7317    ,
        0.73776948,  0.74378943,  0.74976104,  0.75568551,  0.76156384,
        0.76739717,  0.7731865 ,  0.77893275,  0.78463697,  0.79030001];

var levelObj = {};

function level(cpMult){
    if(levelObj[cpMult]) {
        return levelObj[cpMult];
    }
    for(let i = 0; i < levels.length; ++i) {
        var diff = cpMult - levels[i];
        if(Math.abs(diff) < .001) {
            levelObj[cpMult] = i+1;
            return i+1;
        }
        // Just passed a half level
        if(diff < 0) {
            return i + .5;
        }
    }
    return 0;
}

function multForLevel(level) {
    return levels[level-1];
}

module.exports = {
    pokeData,
    moveData,
    maxAttack,
    maxDefense,
    maxStamina,
    maxCP,
    level,
    multForLevel
};