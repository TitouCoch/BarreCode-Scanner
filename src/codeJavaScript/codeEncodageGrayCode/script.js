//-----------------------------------------------------------------------------------
//VERSION GrayCode 


String.prototype.encodeGrayCode = function() {
  //Initialisation de la list de valeur 
  var listeEncodage =[['a',[0,0,0,0,0,0]],
                      ['b',[0,0,0,0,0,1]],
                      ['c',[0,0,0,0,1,1]],
                      ['d',[0,0,0,1,1,1]],
                      ['e',[0,0,1,1,1,1]],
                      ['f',[0,1,1,1,1,1]],
                      ['g',[1,1,1,1,1,1]],
                      ['h',[1,1,1,1,1,0]],
                      ['i',[1,1,1,1,0,0]],
                      ['j',[1,1,1,0,0,0]],
                      ['k',[1,1,0,0,0,0]],
                      ['l',[1,0,0,0,0,0]],
                      ['m',[1,0,0,0,0,1]],
                      ['n',[1,0,0,0,1,1]],
                      ['o',[1,0,0,1,1,1]],
                      ['p',[1,0,1,1,1,1]],
                      ['q',[1,0,1,1,1,0]],
                      ['r',[1,0,1,1,0,0]],
                      ['s',[1,0,1,0,0,0]],
                      ['t',[0,0,1,0,0,0]],
                      ['u',[0,0,1,1,0,0]],
                      ['v',[0,1,1,1,0,0]],
                      ['w',[0,1,1,1,1,0]],
                      ['x',[0,1,0,1,1,0]],
                      ['y',[0,1,0,1,0,0]],
                      ['z',[0,1,0,1,0,1]]];

  var listeEncodageInt = [[0,[0,1,1,1,0,1]],
                          [1,[0,0,1,1,0,1]],
                          [2,[0,0,1,0,0,1]],
                          [3,[1,0,1,0,0,1]],
                          [5,[1,1,1,0,1,1]],
                          [6,[1,1,1,0,1,0]],
                          [7,[1,0,1,0,1,0]],
                          [8,[0,0,1,0,1,0]],
                          [9,[0,1,1,0,1,0]]];

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



//Initialisation chaine de caractère licence
var licence = '9';
//Appelle de la fonction avec la licence pour paramètre
licence.encodeGrayCode()































/*Fonction d'encodage unicode
String.prototype.encodeUnicode = function() {

  //Initialisation des variables
  var licence = this, result = [],encryped_string=[]

  //Convertion caractère
  //Parcour de la chaine de caractère et convertion des caractères en Unicode inséré dans la liste de liste result[]
  for (var i=0; i<licence.length;i++) result.push(licence[i].charCodeAt(0).toString(2).match(/.{1,3}/g));

  //Transformation de liste de liste en liste
  //Parcour de la liste de liste result[]
  for (var i=0; i<result.length; i++) 
  //Parcour des valeurs des listes de result[] et ajout des valeurs dans une liste simple encrypted_string
  for (var j=0; j<result[i].length; j++) encryped_string.push(key.indexOf(result[i][j]));



  return encryped_string
}
*/








