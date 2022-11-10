//-------------------------------------------------------------------------------------
//VERSION BASE 36 - TABLE DE CRYPTAGE 

String.prototype.encodeBaseTrenteSix = function() {

  //initialisation des variables dans la fonction
  var licence= this
  //Table encodage caractère alphabet
  var tableEncodage = [['a',1,1],
                       ['b',1,2],
                       ['c',1,3],
                       ['d',1,4],
                       ['e',1,5],
                       ['f',1,6],
                       ['g',1,7],
                       ['h',1,8],
                       ['i',1,9],
                       ['j',2,1],
                       ['k',2,2],
                       ['l',2,3],
                       ['m',2,4],
                       ['n',2,5],
                       ['o',2,6],
                       ['p',2,7],
                       ['q',2,8],
                       ['r',2,9],
                       ['s',3,1],
                       ['t',3,2],
                       ['u',3,3],
                       ['v',3,4],
                       ['w',3,5],
                       ['x',3,6],
                       ['y',3,7],
                       ['z',3,8],
                      ];
  //Table encodage chiffre 0-9
  var tableEncodageInt=[[0,3,9],
                        [1,4,1],
                        [2,4,2],
                        [3,4,3],
                        [4,4,4],
                        [5,4,5],
                        [6,4,6],
                        [7,4,7],
                        [8,4,8],
                        [9,4,9]];
  //Variable compteur
  var compteur = 0

  //Parcour de la chaine de caratère licence
  for (var i=0; i<licence.length;i++) {
    //Parcour de la table de l'alphabet 
    for(var a=0; a<tableEncodage.length;a++){
      //Comparaison des valeurs courantes
      if(licence[i]==tableEncodage[a][0])
      {
        //Modifie hauteur barre courante
        for (var c=1; c<3;c++){
          temp=document.getElementById('vertical'+compteur);
          temp2 = 10*tableEncodage[a][c];
          temp.style.height=`${temp2}px`;
          temp.style.borderLeft="4px solid white";
          temp.style.display="inline-block";
          temp.style.marginLeft="5px";
          temp.style.borderRadius="5px"
          compteur+=1;
        }
        break;
      }
    }
    //Parcour de la table de chiffre
    for(var b=0; b<10;b++){
      //Comparaison des valeurs courantes
      if(licence[i].toString()==tableEncodageInt[b][0].toString())
      {
        //Modifie hauteur barre courante
        for (var c=1; c<3;c++){
          temp=document.getElementById('vertical'+compteur);
          temp2 = 10*tableEncodageInt[b][c];
          temp.style.height=`${temp2}px`;
          temp.style.borderLeft="4px solid white";
          temp.style.display="inline-block";
          temp.style.marginLeft="5px";
          temp.style.borderRadius="5px"
          compteur+=1;
        }
        break;
      }
    }
  } 
  return licence
}


//Initialisation de la variable licence
var licence = "vt0410532 ";
//Appelle de la fonction
licence.encodeBaseTrenteSix()




