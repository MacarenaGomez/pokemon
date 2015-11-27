$(function(){
  "use strict";
  // var ajax;

  PokemonApp.PokemonEvolutions = function(info){
    this.info = info;
    this.ajax = new PokemonApp.Ajax();
  };

  PokemonApp.PokemonEvolutions.prototype.render = function(){
    this.ajax.execute(this.info[0].resource_uri, loadEvolution.bind(this));
    $(".js-evolutions-modal").modal("show");
  };

  function loadEvolution(evolution){
    $(".js-pkmn-evolutions").append("<div data-id='" + evolution.name.toLowerCase() + "'>" + evolution.name + "</div>");

    if(evolution.sprites.length > 0) {
      this.ajax.execute(evolution.sprites[0].resource_uri, loadImage);
      
      if(evolution.evolutions.length > 0) {
        var nextEvolution = new PokemonApp.PokemonEvolutions(evolution.evolutions);
        nextEvolution.render();
      }
    }
  }

  function loadImage(pokemonImage){
    var name = pokemonImage.pokemon.name.toLowerCase();
    $(".js-pkmn-evolutions").find("div[data-id='" + name + "']").append("<img src='http://pokeapi.co/" + pokemonImage.image + "'>");
  }
});