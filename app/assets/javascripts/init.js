
//Te aseguras que lo creas en este scope y no en otro

//Estamos creando un namespace para nosotros, init inicializará todo nuestro js
if (window.PokemonApp === undefined){
  window.PokemonApp = {};
}

PokemonApp.init = function() {
  //3rd party setup code here
  console.log("Pokemon App ONLINE!");
};

$(document).on("ready",function(){
  PokemonApp.init();
});


