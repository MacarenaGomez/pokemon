// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
(function() { 
  "use strict";
  var ajax;

PokemonApp.Pokemon = function (pokemonUri) {
  //Método de clase!!! 
  this.id = PokemonApp.Pokemon.idFromUri(pokemonUri);
  ajax = new PokemonApp.Ajax();
};  

//Método de instancia!!!!
PokemonApp.Pokemon.prototype.render = function(){
  ajax.execute('/api/pokemon/' + this.id, this.PrintPokemonInfo);

  $('.js-pokemon-modal').modal('show');
}

PokemonApp.Pokemon.idFromUri = function (pokemonUri){
  var uriSegments = pokemonUri.split("/");
  var secondLast = uriSegments.length - 2;
  return uriSegments[secondLast];
};

PokemonApp.Pokemon.prototype.PrintPokemonInfo = function(pokemon){
  LoadInfo(pokemon);
  LoadImages(pokemon);
  LoadDescription(pokemon);
  LoadEvolutions(pokemon);
}

function LoadInfo(pokemon){
  $('.js-pkmn-name').text(pokemon.name);
  $('.js-pkmn-number').text(pokemon.pkdx_id);
  $('.js-pkmn-height').text(pokemon.height);
  $('.js-pkmn-weight').text(pokemon.weight);
  $('.js-pkmn-hp').text(pokemon.hp);
  $('.js-pkmn-attack-defense').text(pokemon.attack + '/' + pokemon.defense);
  $('.js-pkmn-sp').text(pokemon.sp_atk + '/' + pokemon.sp_def);
  $('.js-pkmn-speed').text(pokemon.speed);

  var pkmn_types = pokemon.types.map(function(elem){
                                        return elem.name;
                                      }).join("/");
  
  $('.js-pkmn-types').text(pkmn_types);
}

function LoadImages(pokemon){
  pokemon.sprites.forEach(function(sprite){
    ajax.execute(sprite.resource_uri, PrintPokemonImage);
  });
}

function LoadDescription(pokemon){
  var descriptions = pokemon.descriptions.map(function(description){
    return description.resource_uri;
  }).sort();
  var description_uri = descriptions[descriptions.length - 1];
  ajax.execute(description_uri, PrintPokemonDescription);
}

function LoadEvolutions(pokemon){
  if(pokemon.evolutions.length > 0) {
    $(".js-pkmn-evolution").on("click", function(event){
      var evolutions = new PokemonApp.PokemonEvolutions(pokemon.evolutions);
      evolutions.render();
    });
  }
}

function PrintPokemonImage(response){
  $('.js-pkmn-image').append('<img src="http://pokeapi.co' + response.image + '">');
}

function PrintPokemonDescription(response){
  $('.js-pkmn-descriptions').text(response.description);
}

//Tendremos en cada fichero nuestra definición de clase y tb el uso!
$(document).on("ready", function(){

  $(".js-show-pokemon").on("click", function(event){
    $('.js-pkmn-image').empty();
    $(".js-pkmn-evolutions").empty();

    var $button = $(event.currentTarget);
    var pokemonUri = $button.data("pokemon-uri"); //Es la forma de utilizar los data
    //así jqeury te da más facilidades!! usa el data!

    var pokemon = new PokemonApp.Pokemon(pokemonUri);
    pokemon.render();
  });

});

})();