//-----------------------------------------------------------------------------------
//VERSION UNICODE 

//Initialisation de la list de valeur 
var key = ['0', '1', '000','001','010','100','110','101','011','111']

//Fonction d'encodage unicode
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

  //Modification de la hauteur de la barre courante 
  //Parcour de la liste encrypted_string
  for (var a=0; a<encryped_string.length; a++) {
    
    temp=document.getElementById('vertical'+a);
    temp2 = 10*encryped_string[a]
    temp.style.height=`${temp2}px`
    temp.style.borderLeft="4px solid white"
    temp.style.display="inline-block"
    temp.style.marginLeft="5px"
    temp.style.borderRadius="5px"
  }

  return encryped_string
}


//Initialisation chaine de caractère licence
var licence = 'VT0410532';
//Appelle de la fonction avec la licence pour paramètre
licence.encodeUnicode()






