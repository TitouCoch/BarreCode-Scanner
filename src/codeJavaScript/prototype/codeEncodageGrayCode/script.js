//-----------------------------------------------------------------------------------
//VERSION GrayCode 


String.prototype.encodeGrayCode = function() {
  //Initialisation de la list de valeur 
  var listeEncodage =[['a',[0,0,0,0,0,0]],
                      ['b',[0,0,0,0,0,1]],
                      ['c',[0,0,0,0,1,1]],
                      ['d',[0,0,0,0,1,0]],
                      ['e',[0,0,0,1,1,0]],
                      ['f',[0,0,0,1,1,1]],
                      ['g',[0,0,0,1,0,1]],
                      ['h',[0,0,0,1,0,0]],
                      ['i',[0,0,1,1,0,0]],
                      ['j',[0,0,1,1,0,1]],
                      ['k',[0,0,1,1,1,1]],
                      ['l',[0,0,1,1,1,0]],
                      ['m',[0,0,1,0,1,0]],
                      ['n',[0,0,1,0,1,1]],
                      ['o',[0,0,1,0,0,1]],
                      ['p',[0,0,1,0,0,0]],
                      ['q',[0,1,1,0,0,0]],
                      ['r',[0,1,1,0,0,1]],
                      ['s',[0,1,1,0,1,1]],
                      ['t',[0,1,1,0,1,0]],
                      ['u',[0,1,1,1,1,0]],
                      ['v',[0,1,1,1,1,1]],
                      ['w',[0,1,1,1,0,1]],
                      ['x',[0,1,1,1,0,0]],
                      ['y',[0,1,0,1,0,0]],
                      ['z',[0,1,0,1,0,1]],
                      ['A',[0,1,0,1,1,1]],
                      ['B',[0,1,0,1,1,0]],
                      ['C',[0,1,0,0,1,0]],
                      ['D',[0,1,0,0,1,1]],
                      ['E',[0,1,0,0,0,1]],
                      ['F',[0,1,0,0,0,0]],
                      ['G',[1,1,0,0,0,0]],
                      ['H',[1,1,0,0,0,1]],
                      ['I',[1,1,0,0,1,1]],
                      ['J',[1,1,0,0,1,0]],
                      ['K',[1,1,0,1,1,0]],
                      ['L',[1,1,0,1,1,1]],
                      ['M',[1,1,0,1,0,1]],
                      ['N',[1,1,0,1,0,0]],
                      ['O',[1,1,1,1,0,0]],
                      ['P',[1,1,1,1,0,1]],
                      ['Q',[1,1,1,1,1,1]],
                      ['R',[1,1,1,1,1,0]],
                      ['S',[1,1,1,0,1,0]],
                      ['T',[1,1,1,0,1,1]],
                      ['U',[1,1,1,0,0,1]],
                      ['V',[1,1,1,0,0,0]],
                      ['W',[1,0,1,0,0,0]],
                      ['X',[1,0,1,0,0,1]],
                      ['Y',[1,0,1,0,1,1]],
                      ['Z',[1,0,1,0,1,0]]];

  var listeEncodageInt = [[0,[1,0,1,1,1,0]],
                          [1,[1,0,1,1,1,1]],
                          [2,[1,0,1,1,0,1]],
                          [3,[1,0,1,1,0,0]],
                          [4,[1,0,0,1,0,0]],
                          [5,[1,0,0,1,0,1]],
                          [6,[1,0,0,1,1,1]],
                          [7,[1,0,0,1,1,0]],
                          [8,[1,0,0,0,1,0]],
                          [9,[1,0,0,0,1,1]]];

  var typeBarre = [[1,[0,0,0]],
                   [2,[0,0,1]],
                   [3,[0,1,1]],
                   [4,[1,1,1]],
                   [5,[1,1,0]],
                   [6,[1,0,0]],
                   [7,[1,0,1]],
                   [8,[0,1,0]]];

  //Initialisation des variables
  var licence = this, result = [], listeBarre = [],temp = []


  //Conversion en Gray code
  for(var a=0;a<licence.length;a++){

    //Conversion des caractères
    for(var b=0;b<listeEncodage.length;b++){
      if(licence[a]==listeEncodage[b][0])
      {
        for(var d=0;d<listeEncodage[b][1].length;d++){
          result.push(listeEncodage[b][1][d])
        }
      }
    }
    //Conversion des chiffres
    for(var c=0;c<listeEncodageInt.length;c++){
      if(licence[a]==listeEncodageInt[c][0])
      {
        for(var e=0;e<listeEncodageInt[c][1].length;e++){
          result.push(listeEncodageInt[c][1][e])
        }
      }
    }
  }

  //Conversion en barre
  //Initialisation 
  var i=0;
  //Parcour de la liste de gray code
  while(i<result.length){
    //Parcour de 3 éléments succéssivement 
    for(var k=0;k<3;k++){
      temp.push(result[i+k]); //insertion des éléments dans une liste temporaire
    }
    //Parcour de la liste type barre et comparaison avec la liste temp
    for(var j=0;j<8;j++){
      if(JSON.stringify(temp)==JSON.stringify(typeBarre[j][1])){
        listeBarre.push(typeBarre[j][0]);
      }
    }
    //Mise à jour des variables
    temp=[];
    i = i+3;
  }

  //Modification de la hauteur de la barre courante 
  //Parcour de la liste listeBarre
  for (var a=0; a<listeBarre.length; a++) { 
    barreCourante=document.getElementById('vertical'+a);
    hauteurBarre = 10*listeBarre[a]
    barreCourante.style.height=`${hauteurBarre}px`
    barreCourante.style.borderLeft="4px solid white"
    barreCourante.style.display="inline-block"
    barreCourante.style.marginLeft="5px"
    barreCourante.style.borderRadius="5px"
  }
  return licence
}

//Input de la licence
//Récupération des DOM
var input = document.querySelector("#licenceInput")
var buttonEncode = document.querySelector("#encodeButton")
var exempleLicence = document.querySelectorAll(".exempleLicences")

//Evenement du clique sur le bouton Encode
buttonEncode.addEventListener("click", function(){
  var licence = input.value
  licence.encodeGrayCode()
})












