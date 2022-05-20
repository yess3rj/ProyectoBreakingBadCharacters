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

  document.getElementById("delete").addEventListener("click", function(){
  document.querySelector("#popup").classList.toggle("is-active");
  });


document.getElementById("reset").addEventListener("click",getFullList);


document.getElementById("character-status").addEventListener("change", function(evt){
  var estatus = evt.target.value;

  if(estatus==""){
      listCharacters(characters2);
  }else{
       characters2 = characters.filter((character) => character.status.includes(estatus))
      listCharacters(characters2);
  }
});

document.querySelector("#search").addEventListener("keyup",function(evt){
  if(evt.target.value.length>=2){
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
        card.dataset.birthday = characters[i].birthday;
        card.dataset.appearance = characters[i].appearance.join(", ");
        card.dataset.img = characters[i].img;
        card.dataset.portrayed = characters[i].portrayed;
       

        card.addEventListener("click", abrirPopup)



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

    document.querySelector("#character-tags").append(info.appearance);
    
    
    var tipoArreglo = info.appearance.split(",");
    for(var j = 0 ; j<tipoArreglo.length;j++){
        let tSpan =  document.createElement("span");
        tSpan.classList.add("tag", "mr-1");
        tSpan.innerText=tipoArreglo[j];


    }

    document.querySelector("#character-name").innerHTML= info.name;
    document.querySelector("#character-img").src= info.img;
    document.querySelector("#character-number").innerHTML= info.char_id;
    document.querySelector("#status").innerHTML= info.status;
    document.querySelector("#character-nickname").innerHTML= info.nickname;
    document.querySelector("#character-birthday").innerHTML= info.birthday;
    document.querySelector("#character-portrayed").innerHTML= info.portrayed;
    

    document.querySelector("#popup").classList.toggle("is-active");
}


