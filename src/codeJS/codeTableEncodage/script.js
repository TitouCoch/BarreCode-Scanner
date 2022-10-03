//-------------------------------------------------------------------------------------
//VERSION BASE 36 - TABLE DE CRYPTAGE 

String.prototype.encodeBaseTrenteSix = function() {

  var chaineCaractere = this

  var tableCryptage = [['a',1,1],
                       ['b',1,2],
                       ['c',1,3],
                       ['d',1,4],
                       ['e',1,5],
                       ['f',1,6],
                       ['g',1,7],
                       ['h',1,8],
                       ['i',1,9],
                       ['j',2,0],
                       ['k',2,1],
                       ['l',2,2],
                       ['m',2,3],
                       ['n',2,4],
                       ['o',2,5],
                       ['p',2,6],
                       ['q',2,7],
                       ['r',2,8],
                       ['s',2,9],
                       ['t',3,0],
                       ['u',3,1],
                       ['v',3,2],
                       ['w',3,3],
                       ['x',3,4],
                       ['y',3,5],
                       ['z',3,6],
                      ];

var tableCryptageInt=[[0,3,7],
                      [1,3,8],
                      [2,3,9],
                      [3,4,0],
                      [4,4,1],
                      [5,4,2],
                      [6,4,3],
                      [7,4,4],
                      [8,4,5],
                      [9,4,6]];
  

  var compteur = 0
  for (var i=0; i<chaineCaractere.length;i++) {
    for(var a=0; a<tableCryptage.length;a++){
      if(chaineCaractere[i]==tableCryptage[a][0])
      {
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptage[a][1];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid white";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptage[a][2];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid white";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        break;
      }
    }
    for(var a=0; a<tableCryptageInt.length;a++){

      if(chaineCaractere[i]==tableCryptageInt[a][0])
      {
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptageInt[a][1];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid black";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        temp=document.getElementById('vertical'+compteur);
        temp2 = 10*tableCryptageInt[a][2];
        temp.style.height=`${temp2}px`;
        temp.style.borderLeft="4px solid black";
        temp.style.display="inline-block";
        temp.style.marginLeft="2px";
        compteur+=1;
        break;
      }
    }

  } 
  return chaineCaractere
}


var chaineCaractere = "0000";
chaineCaractere.encodeBaseTrenteSix()




