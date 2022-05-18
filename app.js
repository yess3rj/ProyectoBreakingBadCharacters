let characters = [];
let characters2 = [];

window.onload = function(){
    fetch("https://www.breakingbadapi.com/api/characters")
    .then(response => response.json())
    .then(data => {
      characters=data;
      characters2=characters;
      listCharacters(characters)
    });
};

getFavoritos();

  document.getElementById("delete").addEventListener("click", function(){
  document.querySelector("#popup").classList.toggle("is-active");
  });


document.getElementById("reset").addEventListener("click",getFullList);

document.getElementById("favoritos").addEventListener("click", function(){
    document.getElementById("mis-favoritos").classList.toggle("is-hidden");
})

document.getElementById("character-status").addEventListener("change", function(evt){
  var tipo_buscado = evt.target.value;

  if(tipo_buscado==""){
      listCharacters(characters2);
  }else{
       characters2 = characters2.filter((character) => character.status.includes(tipo_buscado))
      listCharacters(characters2);
  }
});

document.querySelector("#buscar").addEventListener("keyup",function(evt){
  if(evt.target.value.length>=3){
      characters2 = characters2.filter((character) => 
              character.name.toLowerCase().includes(evt.target.value.toLowerCase())
      )

      listCharacters(characters2);
  }

});

document.querySelector("#ascendente").addEventListener("click",function(){
  characters2.sort((a,b)=> a.name > b.name ? 1 : -1);
  listCharacters(characters2);
});

document.querySelector("#descendente").addEventListener("click",function(){
  characters2.sort((a,b)=> a.name > b.name ? -1 : 1);
  listCharacters(characters2);
});

function getFullList()
{
    characters2=characters;
    listCharacters(characters2);
}

function getFavoritos(){
    document.querySelector("#listado-favoritos").innerHTML='';
    const fav = sessionStorage.getItem("favoritos");
    var listadoFavoritos = JSON.parse(fav);
    if (fav && fav.length){

        for(var i=0;i<listadoFavoritos.length;i++){
            document.querySelector("#listado-favoritos").innerHTML+="<div class='has-text-centered'>"+listadoFavoritos[i].name+"</div>"
        }
    }
}

/*Funcion que dibuja un array*/
function listCharacters(characters){
    document.getElementById("listado").innerHTML="";

    for(var i=0;i<characters.length;i++){
        let div = document.createElement("div");
        div.classList.add("column","is-3");

        let card = document.createElement("div");
        card.classList.add("card", "is-relative");
        card.dataset.name=characters[i].name;
        card.dataset.char_id=characters[i].char_id;
        card.dataset.nickname=characters[i].nickname;
        card.dataset.status = characters[i].status;
        card.dataset.img = characters[i].img;
       

        card.addEventListener("click", abrirPopup)

        var buttonFav = document.createElement("button");
        buttonFav.dataset.char_id=characters[i].char_id;
        buttonFav.classList.add("button","is-warning", "is-fav");
        buttonFav.innerHTML="<span class='icon'><i class='fa fa-star'> </span>"
        buttonFav.addEventListener("click", function(evt){
            evt.stopPropagation();
            var id = parseInt(evt.currentTarget.dataset.char_id);
            console.log(evt.currentTarget.dataset.char_id);
            
            var resultados = characters.filter((character) =>
                character.char_id === id
            );

            var listadoFavoritos = JSON.parse(sessionStorage.getItem("favoritos"));
            
            if(listadoFavoritos == null){
                sessionStorage.setItem("favoritos",JSON.stringify(resultados));
            }else{
                listadoFavoritos.push(resultados[0]);
                sessionStorage.setItem("favoritos",JSON.stringify(listadoFavoritos));
            }
            getFavoritos();
            console.log(listadoFavoritos);

        });
        
        card.append(buttonFav);



        let cardImage =  document.createElement("div");
        cardImage.classList.add("card-image");

        let figure = document.createElement("figure");
        figure.classList.add("image","is-square","has-background-light");
    
        let img = document.createElement("img");
        img.setAttribute("src", characters[i].img);
        figure.append(img);

        cardImage.append(figure);

        let cardContent= document.createElement("div");
        cardContent.classList.add("card-content","px-3","py-4");
        
        let hTitle= document.createElement("h2");
        hTitle.classList.add("is-size-4", "has-text-weight-bold");
        hTitle.innerText=characters[i].name;

        cardContent.append(hTitle);

        let tipoArreglo=characters[i].status;//Arreglo
        card.dataset.status= characters[i].status;

        for(var j = 0 ; j<tipoArreglo.length;j++){
          let tSpan =  document.createElement("span");
          tSpan.classList.add("tag", "mr-1");
          tSpan.innerText=tipoArreglo[j];
          var micolor= getColor(tipoArreglo[j])
          tSpan.classList.add(micolor);
          cardContent.append(tSpan);
      }

      let p1 = document.createElement("p");
      p1.classList.add("character-number");
      p1.innerHTML="<b>Personaje "+characters[i].char_id+"</b>";
      cardContent.append(p1);

  

        card.append(cardImage);
        card.append(cardContent);

        div.append(card);

        document.getElementById("listado").append(div);
    }

}

/*Funcion que dibuja un array*/
function abrirPopup(evt){

    var info = evt.currentTarget.dataset
  
    document.querySelector("#character-tags").innerHTML='';

    document.querySelector("#character-tags").append(info.status);
    console.log("status", info.status);
    
    /* var tipoArreglo = info.status.split("");
    for(var j = 0 ; j<tipoArreglo.length;j++){
        let tSpan =  document.createElement("span");
        tSpan.classList.add("tag", "mr-1");
        tSpan.innerText=tipoArreglo[j];

        var color= getColor(tipoArreglo[j])
        
        tSpan.classList.add(color);

        document.querySelector("#character-tags").append(tSpan);
    } */

    document.querySelector("#character-name").innerHTML= info.name;
    document.querySelector("#character-img").src= info.img;
    document.querySelector("#character-number").innerHTML= info.char_id;
    document.querySelector("#character-nickname").innerHTML= info.nickname;
    document.querySelector("#character-birthday").innerHTML= info.birthday;

    document.querySelector("#popup").classList.toggle("is-active");
}

function getColor(status){
  var colorClass;
  switch(status){
      case "Alive":{
         colorClass="Alive";
         break;
      }
      case "Deceased":{
         colorClass="Deceased";
         break;
      }
      case "Presumed dead":{
         colorClass="Presumed";
         break;
     }
     case "Unknown":{
          colorClass="Unknown";
          break;
      }
  }
  return colorClass;
}
